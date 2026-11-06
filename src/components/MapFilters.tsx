import { useState } from 'react'
import { useUserSettings } from '../hooks/useUserSettings'

export interface MapFilterCategory {
  id: string
  label: string
  count: number
  visible: boolean
  group?: string
}

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
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set())
  const { settings } = useUserSettings()
  const isEnglish = settings.language === 'en'
  const userOpacity = settings.minimapOpacity / 100
  const text = isEnglish
    ? {
        filters: 'Map filters', currentMap: 'Current map', changeMap: 'Change map',
        map: 'Game map', search: 'Search point of interest', searchPlaceholder: 'Search objective',
        hideChecked: 'Hide marked points', titles: 'Show titles', showAll: 'Show all',
        hideAll: 'Hide all', other: 'Other',
      }
    : {
        filters: 'Filtros del mapa', currentMap: 'Mapa actual', changeMap: 'Cambiar mapa',
        map: 'Mapa de juego', search: 'Buscar punto de interés', searchPlaceholder: 'Buscar objetivo',
        hideChecked: 'Ocultar puntos marcados', titles: 'Mostrar títulos', showAll: 'Mostrar todo',
        hideAll: 'Ocultar todo', other: 'Otros',
      }

  return (
    <aside className="map-filters" aria-label={text.filters} style={{ opacity: userOpacity}}>
      <div className="map-filters__select">
        <span>{text.currentMap}</span>
        <button type="button" aria-label={text.changeMap}>
          <strong>{text.map}</strong>
          <span aria-hidden="true">⌄</span>
        </button>
      </div>

      <label className="map-filters__search">
        <span className="sr-only">{text.search}</span>
        <input
          type="search"
          placeholder={text.searchPlaceholder}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="map-filters__options">
        <button type="button" onClick={onToggleChecked}>
          <span aria-hidden="true">◈</span>
          {text.hideChecked}
          <span className={`map-filters__switch ${hideChecked ? 'is-on' : ''}`}>
            <span />
          </span>
        </button>
        <button type="button" onClick={onToggleTitles}>
          <span aria-hidden="true">◆</span>
          {text.titles}
          <span className={`map-filters__switch ${displayTitles ? 'is-on' : ''}`}>
            <span />
          </span>
        </button>
      </div>

      <div className="map-filters__actions">
        <button type="button" onClick={onShowAll}>{text.showAll}</button>
        <button type="button" onClick={onHideAll}>{text.hideAll}</button>
      </div>

      {Array.from(new Set(categories.map((category) => category.group ?? 'Other'))).map((group) => {
        const collapsed = collapsedGroups.has(group)
        return (
          <div className="map-filters__section" key={group}>
          <button
            type="button"
            className="map-filters__section-title"
            onClick={() => setCollapsedGroups((current) => {
              const next = new Set(current)
              if (next.has(group)) next.delete(group)
              else next.add(group)
              return next
            })}
            aria-expanded={!collapsed}
          >
            {group === 'Other' ? text.other : group}
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
        )
      })}
    </aside>
  )
}

export default MapFilters
