import { useMemo, useState, type ReactNode } from 'react'
import {
  ImageOverlay,
  MapContainer,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet'
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './GameMap.css'
import MapFilters, { type MapFilterCategory } from './MapFilters'

export interface MapNode {
  id: string
  position: LatLngExpression
  content: ReactNode
  category?: string
  title?: string
  checked?: boolean
  iconUrl?: string
}

export type GameMapChild = MapNode | [ReactNode, LatLngExpression]

export interface GameMapProps {
  name: string
  image: string
  /** Cada hijo se dibuja como un marcador en la coordenada indicada. */
  children?: GameMapChild[]
  filterCategories?: MapFilterCategory[]
  className?: string
}

function ZoomControls() {
  const map = useMap()

  const toggleFullscreen = async () => {
    const container = map.getContainer()
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await container.requestFullscreen()
  }

  return (
    <div className="game-map__controls leaflet-control" aria-label="Controles del mapa">
      <button type="button" onClick={() => map.zoomIn()} aria-label="Acercar mapa">
        +
      </button>
      <button type="button" onClick={() => map.zoomOut()} aria-label="Alejar mapa">
        −
      </button>
      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label="Mostrar mapa en pantalla completa"
      >
        ⛶
      </button>
    </div>
  )
}

function toMapNode(child: GameMapChild, index: number): MapNode {
  if (Array.isArray(child)) {
    return {
      id: `map-node-${index}`,
      position: child[1],
      content: child[0],
    }
  }

  return child
}

function GameMap({
  name,
  image,
  children = [],
  filterCategories = [],
  className = '',
}: GameMapProps) {
  const bounds: LatLngBoundsExpression = [[0, 0], [256, 256]]
  const nodes = useMemo(() => children.map(toMapNode), [children])
  const [search, setSearch] = useState('')
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(new Set())
  const [hideChecked, setHideChecked] = useState(false)
  const [displayTitles, setDisplayTitles] = useState(true)

  const categories = useMemo<MapFilterCategory[]>(() => {
    const categoryMap = new Map(
      filterCategories.map((category) => [category.id, category]),
    )
    nodes.forEach((node) => {
      const categoryId = node.category ?? 'Puntos del mapa'
      if (!categoryMap.has(categoryId)) {
        categoryMap.set(categoryId, {
          id: categoryId,
          label: categoryId,
          count: 0,
          visible: true,
          group: 'Other',
        })
      }
    })

    return Array.from(categoryMap.values()).map((category) => ({
      ...category,
      visible: !hiddenCategories.has(category.id),
    }))
  }, [filterCategories, hiddenCategories, nodes])

  const visibleNodes = nodes.filter((node) => {
    const category = node.category ?? 'Puntos del mapa'
    const matchesSearch =
      !search ||
      node.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      category.toLocaleLowerCase().includes(search.toLocaleLowerCase())

    return (
      matchesSearch &&
      !hiddenCategories.has(category) &&
      !(hideChecked && node.checked)
    )
  })

  const toggleCategory = (category: string) => {
    setHiddenCategories((current) => {
      const next = new Set(current)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-[#1d1d1d] via-[#162225] to-[#11181a] relative overflow-x-hidden">

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full border-4 border-purple-400/10 pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full border-2 border-purple-500/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        <section className={`game-map ${className}`.trim()} aria-label={`Mapa de ${name}`}>
          <header className="game-map__header">
            <h1 className="game-map__title">{name}</h1>
          </header>

          <div className="game-map__layout">
            <MapFilters
              categories={categories}
              search={search}
              hideChecked={hideChecked}
              displayTitles={displayTitles}
              onSearchChange={setSearch}
              onToggleChecked={() => setHideChecked((value) => !value)}
              onToggleTitles={() => setDisplayTitles((value) => !value)}
              onToggleCategory={toggleCategory}
              onShowAll={() => setHiddenCategories(new Set())}
              onHideAll={() => setHiddenCategories(new Set(categories.map(({ id }) => id)))}
            />

            <div className="game-map__viewport">
              <MapContainer
                center={[128, 128]}
                zoom={2}
                zoomControl={false}
                crs={L.CRS.Simple}
                style={{ height: '100%', width: '100%' }}
                minZoom={0}
                maxZoom={3}
                scrollWheelZoom
              >
                <ImageOverlay url={image} bounds={bounds} />
                <ZoomControls />

                {visibleNodes.map((node) => (
                  <Marker
                    key={node.id}
                    position={node.position}
                    icon={node.iconUrl ? L.icon({
                      iconUrl: node.iconUrl,
                      iconSize: [24, 24],
                      iconAnchor: [12, 12],
                      popupAnchor: [0, -12],
                    }) : undefined}
                  >
                    {node.title && displayTitles && (
                      <Popup>
                        <strong>{node.title}</strong>
                        <br />
                        {node.content}
                      </Popup>
                    )}
                    {!node.title && <Popup>{node.content}</Popup>}
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default GameMap
