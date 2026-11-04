import type { MapNode } from '../components/GameMap'
import type { MapFilterCategory } from '../components/MapFilters'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5261/api').replace(/\/+$/, '')
// Version 2 separates category caches after adding the game filter to the request.
const CACHE_VERSION = 2

export interface MapApiConfig {
  gameId: string
  apiGameId: number
  cacheDays: number
}

export interface MapData {
  markers: MapNode[]
  categories: MapFilterCategory[]
  fromCache: boolean
  cachedAt?: number
}

interface CacheEntry<T> {
  version: number
  cachedAt: number
  data: T
}

const getCacheKey = (gameId: string, resource: string) =>
  `map-front:v${CACHE_VERSION}:${gameId}:${resource}`

function readCache<T>(key: string, maxAgeMs: number): CacheEntry<T> | null {
  const raw = localStorage.getItem(key)
  if (!raw) return null

  try {
    const entry = JSON.parse(raw) as CacheEntry<T>
    if (entry.version !== CACHE_VERSION || !entry.cachedAt || !entry.data) {
      localStorage.removeItem(key)
      return null
    }

    if (Date.now() - entry.cachedAt > maxAgeMs) {
      localStorage.removeItem(key)
      return null
    }

    return entry
  } catch {
    localStorage.removeItem(key)
    return null
  }
}

function writeCache<T>(key: string, data: T) {
  const entry: CacheEntry<T> = {
    version: CACHE_VERSION,
    cachedAt: Date.now(),
    data,
  }
  localStorage.setItem(key, JSON.stringify(entry))
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error(`La API respondió con ${response.status} en ${path}.`)
  }
  return response.json() as Promise<T>
}

function unwrapArray<T>(value: unknown, keys: string[]): T[] {
  if (Array.isArray(value)) return value as T[]
  if (value && typeof value === 'object') {
    for (const key of keys) {
      const nested = (value as Record<string, unknown>)[key]
      if (Array.isArray(nested)) return nested as T[]
    }
  }
  throw new Error('La API devolvió un formato de lista no válido.')
}

function normalizeMarkers(value: unknown): MapNode[] {
  return unwrapArray<Record<string, unknown>>(value, ['data', 'markers', 'locations', 'items']).map((marker, index) => {
    const position = marker.position ?? marker.coordinates
    if (!Array.isArray(position) || position.length < 2) {
      throw new Error(`El marcador ${index + 1} no tiene coordenadas válidas.`)
    }
    const latitude = Number(position[0])
    const longitude = Number(position[1])
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      throw new Error(`El marcador ${index + 1} tiene coordenadas no numéricas.`)
    }

    return {
      id: String(marker.id ?? `map-node-${index}`),
      position: [latitude, longitude],
      content: String(marker.content ?? marker.description ?? ''),
      category: marker.category == null ? undefined : String(marker.category),
      title: marker.title == null ? undefined : String(marker.title),
      checked: Boolean(marker.checked),
      iconUrl: marker.iconUrl == null ? undefined : String(marker.iconUrl),
      group: marker.group == null ? undefined : String(marker.group),
    }
  })
}

function normalizeCategories(value: unknown): MapFilterCategory[] {
  return unwrapArray<Record<string, unknown>>(value, ['data', 'categories', 'items']).map((category, index) => {
    const label = String(category.label ?? category.name ?? category.category ?? `Categoría ${index + 1}`)
    return {
      id: String(category.id ?? category.category ?? label),
      label,
      count: Number(category.count ?? category.total ?? 0),
      visible: true,
      group: category.group == null ? 'Other' : String(category.group),
    }
  })
}

export async function fetchMapData(config: MapApiConfig): Promise<MapData> {
  const maxAgeMs = config.cacheDays * 24 * 60 * 60 * 1000
  const markerKey = getCacheKey(config.gameId, 'markers')
  const categoryKey = getCacheKey(config.gameId, 'categories')
  const cachedMarkers = readCache<MapNode[]>(markerKey, maxAgeMs)
  const cachedCategories = readCache<MapFilterCategory[]>(categoryKey, maxAgeMs)

  if (cachedMarkers && cachedCategories) {
    return {
      markers: cachedMarkers.data,
      categories: cachedCategories.data,
      fromCache: true,
      cachedAt: Math.min(cachedMarkers.cachedAt, cachedCategories.cachedAt),
    }
  }

  const [markersResponse, categoriesResponse] = await Promise.all([
    getJson<unknown>(`/map/markers?juego=${encodeURIComponent(config.apiGameId)}`),
    getJson<unknown>(`/map/categories/summary?juego=${encodeURIComponent(config.apiGameId)}`),
  ])
  const markers = normalizeMarkers(markersResponse)
  const categories = normalizeCategories(categoriesResponse)
  const categoriesByName = new Map(
    categories.map((category) => [category.label.toLocaleLowerCase(), category]),
  )
  const normalizedMarkers = markers.map((marker) => {
    if (!marker.category) return marker
    const category = categoriesByName.get(marker.category.toLocaleLowerCase())
    return category ? { ...marker, category: category.id, group: marker.group ?? category.group } : marker
  })
  writeCache(markerKey, normalizedMarkers)
  writeCache(categoryKey, categories)

  return { markers: normalizedMarkers, categories, fromCache: false }
}
