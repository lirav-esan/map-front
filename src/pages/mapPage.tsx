import GameMap from '../components/GameMap'
import ShrineMapImage from '../assets/shrine_ruins_map.jpg'
import WuWaMapImage from '../assets/wuwa.gif'
import { useParams, useNavigate } from 'react-router-dom'
import { ComingSoonPage } from './comingSoon';
import { useEffect, useState } from 'react'
import { fetchMapData, type MapData } from '../services/mapApi'
import { getMapUserData, saveMapProgress, toggleMapFavorite } from '../services/mapUserData'
import { useUserSettings } from '../hooks/useUserSettings'

const MAP_CONFIGS = {
    'monster-hunter': {
        name: 'Monster Hunter Rise (Shrine Ruins)',
        image: ShrineMapImage,
        apiGameId: 1,
        cacheDays: 7,
    },
    'wuthering-waves': {
        name: 'Wuthering Waves',
        image: WuWaMapImage,
        apiGameId: 2,
        cacheDays: 7,
    },
} as const

export default function MapPage() {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { settings } = useUserSettings()
    const isEnglish = settings.language === 'en'
    const currentMap = gameId ? MAP_CONFIGS[gameId as keyof typeof MAP_CONFIGS] : undefined
    const [mapData, setMapData] = useState<MapData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loadedMapId, setLoadedMapId] = useState<string | null>(null)
    const [isFavorite, setIsFavorite] = useState(false)
    const [actionError, setActionError] = useState<string | null>(null)

    useEffect(() => {
        if (!currentMap || !gameId) return
        let cancelled = false
        fetchMapData({ gameId, apiGameId: currentMap.apiGameId, cacheDays: currentMap.cacheDays })
            .then((data) => {
                if (!cancelled) {
                    setError(null)
                    const userData = getMapUserData()
                    const progress = userData.progressByMap[gameId]
                    const markerIds = new Set(data.markers.map((marker) => marker.id))
                    const checkedMarkerIds = new Set(
                        (progress?.checkedMarkerIds ?? []).filter((id) => markerIds.has(id)),
                    )
                    setMapData({
                        ...data,
                        markers: data.markers.map((marker) => ({
                            ...marker,
                            checked: checkedMarkerIds.has(marker.id),
                        })),
                    })
                    setIsFavorite(userData.favoriteMapIds.includes(gameId))
                    saveMapProgress(gameId, [...checkedMarkerIds], data.markers.length)
                }
            })
            .catch((cause: unknown) => {
                if (!cancelled) {
                    setError(cause instanceof Error ? cause.message : 'No se pudieron cargar los datos del mapa.')
                }
            })
            .finally(() => {
                if (!cancelled) setLoadedMapId(gameId)
            })
        return () => { cancelled = true }
    }, [currentMap, gameId])

    const handleToggleFavorite = () => {
        if (!gameId) return
        try {
            setIsFavorite(toggleMapFavorite(gameId))
            setActionError(null)
        } catch (cause) {
            setActionError(cause instanceof Error ? cause.message : 'No se pudo guardar el favorito.')
        }
    }

    const handleToggleMarker = (markerId: string) => {
        if (!gameId || !mapData) return
        const checkedMarkerIds = new Set(
            mapData.markers.filter((marker) => marker.checked).map((marker) => marker.id),
        )
        if (checkedMarkerIds.has(markerId)) checkedMarkerIds.delete(markerId)
        else checkedMarkerIds.add(markerId)

        try {
            saveMapProgress(gameId, [...checkedMarkerIds], mapData.markers.length)
            setMapData({
                ...mapData,
                markers: mapData.markers.map((marker) => ({
                    ...marker,
                    checked: checkedMarkerIds.has(marker.id),
                })),
            })
            setActionError(null)
        } catch (cause) {
            setActionError(cause instanceof Error ? cause.message : 'No se pudo guardar el progreso.')
        }
    }

    if (!currentMap) {
        return <ComingSoonPage />;
    }
    if (loadedMapId !== gameId) {
        return <main className="app app-preferences p-8 text-white">{isEnglish ? 'Loading map data…' : 'Cargando datos del mapa…'}</main>
    }
    if (error || !mapData) {
        return <main className="app app-preferences p-8 text-red-200" role="alert">{error ?? (isEnglish ? 'Map data could not be loaded.' : 'No se pudieron cargar los datos del mapa.')}</main>
    }

    return (
        <main className="app relative">
            <div className="absolute top-4 right-4 z-50 flex flex-col items-end gap-2">
                <button
                    type="button"
                    onClick={handleToggleFavorite}
                    aria-pressed={isFavorite}
                    aria-label={isEnglish
                        ? (isFavorite ? 'Remove favorite' : 'Add to favorites')
                        : (isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos')}
                    className="p-3 rounded-xl bg-[#273b40]/80 backdrop-blur-md border border-[#3c4748] text-[#cae9ea] hover:bg-[#208c8c]/40 hover:border-[#208c8c] transition-all shadow-lg cursor-pointer flex items-center gap-2"
                >
                    <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
                    <span className="hidden sm:inline">
                        {isEnglish
                            ? (isFavorite ? 'Remove favorite' : 'Add to favorites')
                            : (isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos')}
                    </span>
                </button>
                {actionError && <p role="alert" className="max-w-64 rounded-lg bg-[#1d1d1d]/90 px-3 py-2 text-xs text-red-200">{actionError}</p>}
            </div>
            <button
                onClick={() => navigate('/gameSelection')}
                className="absolute top-4 left-4 z-50 p-3 rounded-xl bg-[#273b40]/80 backdrop-blur-md border border-[#3c4748] text-[#cae9ea] hover:bg-[#208c8c]/40 hover:border-[#208c8c] transition-all shadow-lg cursor-pointer flex items-center justify-center"
                title="Volver a selección de juegos"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>
        <GameMap
            name={currentMap.name}
            image={currentMap.image}
            children={mapData.markers}
            filterCategories={mapData.categories}
            onToggleMarker={handleToggleMarker}
        />
        </main>
    );
}