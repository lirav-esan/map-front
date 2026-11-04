import GameMap from '../components/GameMap'
import ShrineMapImage from '../assets/shrine_ruins_map.jpg'
import WuWaMapImage from '../assets/wuwa.gif'
import { useParams } from 'react-router-dom'
import { ComingSoonPage } from './comingSoon';
import { useEffect, useState } from 'react'
import { fetchMapData, type MapData } from '../services/mapApi'

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
    const currentMap = gameId ? MAP_CONFIGS[gameId as keyof typeof MAP_CONFIGS] : undefined
    const [mapData, setMapData] = useState<MapData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!currentMap || !gameId) return
        let cancelled = false
        fetchMapData({ gameId, apiGameId: currentMap.apiGameId, cacheDays: currentMap.cacheDays })
            .then((data) => {
                if (!cancelled) setMapData(data)
            })
            .catch((cause: unknown) => {
                if (!cancelled) {
                    setError(cause instanceof Error ? cause.message : 'No se pudieron cargar los datos del mapa.')
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false)
            })
        return () => { cancelled = true }
    }, [currentMap, gameId])

    if (!currentMap) {
        return <ComingSoonPage />;
    }
    if (loading) {
        return <main className="app p-8 text-white">Cargando datos del mapa…</main>
    }
    if (error || !mapData) {
        return <main className="app p-8 text-red-200" role="alert">{error ?? 'No se pudieron cargar los datos del mapa.'}</main>
    }

    return (
        <main className="app">
        <GameMap
            name={currentMap.name}
            image={currentMap.image}
            children={mapData.markers}
            filterCategories={mapData.categories}
        />
        </main>
    );
}