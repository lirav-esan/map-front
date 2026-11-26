const CACHE_KEY = 'map-front:user-map-data:v1'

export interface MapProgress {
  checkedMarkerIds: string[]
  totalMarkers: number
}

export interface MapUserData {
  favoriteMapIds: string[]
  progressByMap: Record<string, MapProgress>
}

const emptyData = (): MapUserData => ({
  favoriteMapIds: [],
  progressByMap: {},
})

function isMapProgress(value: unknown): value is MapProgress {
  if (!value || typeof value !== 'object') return false
  const progress = value as Record<string, unknown>
  return (
    Array.isArray(progress.checkedMarkerIds) &&
    progress.checkedMarkerIds.every((id: unknown) => typeof id === 'string') &&
    typeof progress.totalMarkers === 'number' &&
    Number.isInteger(progress.totalMarkers) &&
    progress.totalMarkers >= 0
  )
}

function isMapUserData(value: unknown): value is MapUserData {
  if (!value || typeof value !== 'object') return false
  const data = value as Record<string, unknown>
  if (
    !Array.isArray(data.favoriteMapIds) ||
    !data.favoriteMapIds.every((id: unknown) => typeof id === 'string') ||
    !data.progressByMap ||
    typeof data.progressByMap !== 'object' ||
    Array.isArray(data.progressByMap)
  ) {
    return false
  }

  return Object.values(data.progressByMap).every(isMapProgress)
}

export function getMapUserData(): MapUserData {
  const raw = localStorage.getItem(CACHE_KEY)
  if (!raw) return emptyData()

  try {
    const data: unknown = JSON.parse(raw)
    if (!isMapUserData(data)) {
      throw new Error('Los datos guardados de mapas tienen un formato no válido.')
    }
    return data
  } catch {
    throw new Error('Los datos guardados de mapas están dañados y no se pudieron leer.')
  }
}

function saveMapUserData(data: MapUserData) {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data))
}

export function toggleMapFavorite(mapId: string): boolean {
  const data = getMapUserData()
  const isFavorite = data.favoriteMapIds.includes(mapId)
  data.favoriteMapIds = isFavorite
    ? data.favoriteMapIds.filter((id) => id !== mapId)
    : [...data.favoriteMapIds, mapId]
  saveMapUserData(data)
  return !isFavorite
}

export function saveMapProgress(mapId: string, checkedMarkerIds: string[], totalMarkers: number) {
  const data = getMapUserData()
  data.progressByMap[mapId] = {
    checkedMarkerIds: [...new Set(checkedMarkerIds)],
    totalMarkers,
  }
  saveMapUserData(data)
}
