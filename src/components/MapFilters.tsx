import { useState } from 'react'

export interface MapFilterCategory {
  id: string
  label: string
  count: number
  visible: boolean
  group?: string
}

/**
 * Categorías y cantidades mostradas por el mapa de Shrine Ruins.
 * El HTML exportado contiene este catálogo a través del mapa remoto, pero no
 * incluye las coordenadas de los pins.
 */
export const SHRINE_RUINS_FILTERS: MapFilterCategory[] = [
  { id: 'camp', label: 'Camp', count: 2, visible: true, group: 'Locale' },
  { id: 'relic-records', label: 'Relic Records', count: 10, visible: true, group: 'Locale' },
  { id: 'rampage-messages', label: 'Rampage Messages', count: 2, visible: true, group: 'Locale' },
  { id: 'jewel-lilies', label: 'Jewel Lilies', count: 14, visible: true, group: 'Locale' },
  { id: 'buddy-recon', label: 'Buddy Recon', count: 2, visible: true, group: 'Locale' },
  { id: 'fishing-spots', label: 'Fishing Spots', count: 1, visible: true, group: 'Locale' },
  { id: 'special-items', label: 'Special Items', count: 26, visible: true, group: 'Items' },
  { id: 'junk-piles', label: 'Junk Piles', count: 1, visible: true, group: 'Items' },
  { id: 'melynx-gatherings', label: "Melynx's Gatherings", count: 1, visible: true, group: 'Items' },
  { id: 'permabuffers', label: 'Permabuffers', count: 1, visible: true, group: 'Endemic Life' },
  { id: 'hunting-helpers', label: 'Hunting Helpers', count: 1, visible: true, group: 'Endemic Life' },
  { id: 'endemic-life', label: 'Endemic Life', count: 1, visible: true, group: 'Endemic Life' },
  { id: 'adamant-seed', label: 'Adamant Seed', count: 3, visible: true, group: 'Materials' },
]

interface MapFiltersProps {
  categories: MapFilterCategory[]
  search: string
  hideChecked: boolean
  displayTitles: boolean
  onSearchChange: (value: string) => void
  onToggleChecked: () => void
  onToggleTitles: () => void
  onToggleCategory: (id: string) => void
  onShowAll: () => void
  onHideAll: () => void
}

function MapFilters({
  categories,
  search,
  hideChecked,
  displayTitles,
  onSearchChange,
  onToggleChecked,
  onToggleTitles,
  onToggleCategory,
  onShowAll,
  onHideAll,
}: MapFiltersProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className="map-filters" aria-label="Filtros del mapa">
      <div className="map-filters__select">
        <span>Mapa actual</span>
        <button type="button" aria-label="Cambiar mapa">
          <strong>Mapa de juego</strong>
          <span aria-hidden="true">⌄</span>
        </button>
      </div>

      <label className="map-filters__search">
        <span className="sr-only">Buscar punto de interés</span>
        <input
          type="search"
          placeholder="Buscar objetivo"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="map-filters__options">
        <button type="button" onClick={onToggleChecked}>
          <span aria-hidden="true">◈</span>
          Ocultar puntos marcados
          <span className={`map-filters__switch ${hideChecked ? 'is-on' : ''}`}>
            <span />
          </span>
        </button>
        <button type="button" onClick={onToggleTitles}>
          <span aria-hidden="true">◆</span>
          Mostrar títulos
          <span className={`map-filters__switch ${displayTitles ? 'is-on' : ''}`}>
            <span />
          </span>
        </button>
      </div>

      <div className="map-filters__actions">
        <button type="button" onClick={onShowAll}>Mostrar todo</button>
        <button type="button" onClick={onHideAll}>Ocultar todo</button>
      </div>

      {Array.from(new Set(categories.map((category) => category.group ?? 'Other'))).map((group) => (
        <div className="map-filters__section" key={group}>
          <button
            type="button"
            className="map-filters__section-title"
            onClick={() => setCollapsed((value) => !value)}
            aria-expanded={!collapsed}
          >
            {group}
            <span aria-hidden="true">{collapsed ? '⌄' : '⌃'}</span>
          </button>
          {!collapsed && (
            <ul className="map-filters__list">
              {categories.filter((category) => (category.group ?? 'Other') === group).map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    className={!category.visible ? 'is-hidden' : ''}
                    onClick={() => onToggleCategory(category.id)}
                    aria-pressed={category.visible}
                  >
                    <span className="map-filters__category-icon" aria-hidden="true">◆</span>
                    <span>{category.label}</span>
                    <small>0/{category.count}</small>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </aside>
  )
}

export default MapFilters
