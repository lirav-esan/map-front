import { useEffect, useState } from 'react'

export const SETTINGS_STORAGE_KEY = 'map-front-settings'
export const SETTINGS_UPDATED_EVENT = 'map-front-settings-updated'

export interface UserSettings {
  soundEnabled: boolean
  highContrast: boolean
  reducedMotion: boolean
  minimapOpacity: number
  language: 'es' | 'en'
}

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  highContrast: false,
  reducedMotion: false,
  minimapOpacity: 85,
  language: 'es',
}

export function loadUserSettings(): UserSettings {
  try {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!savedSettings) return DEFAULT_SETTINGS

    const parsedSettings = JSON.parse(savedSettings) as Partial<UserSettings>
    return {
      ...DEFAULT_SETTINGS,
      ...parsedSettings,
      minimapOpacity: Math.min(
        100,
        Math.max(40, Number(parsedSettings.minimapOpacity) || DEFAULT_SETTINGS.minimapOpacity),
      ),
      language: parsedSettings.language === 'en' ? 'en' : 'es',
    }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveUserSettings(settings: UserSettings) {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
  window.dispatchEvent(new Event(SETTINGS_UPDATED_EVENT))
}

export function useUserSettings(applyDocumentPreferences = true) {
  const [settings, setSettings] = useState<UserSettings>(loadUserSettings)

  useEffect(() => {
    const syncSettings = () => setSettings(loadUserSettings())
    window.addEventListener(SETTINGS_UPDATED_EVENT, syncSettings)
    window.addEventListener('storage', syncSettings)
    return () => {
      window.removeEventListener(SETTINGS_UPDATED_EVENT, syncSettings)
      window.removeEventListener('storage', syncSettings)
    }
  }, [])

  useEffect(() => {
    if (!applyDocumentPreferences) {
      delete document.documentElement.dataset.highContrast
      delete document.documentElement.dataset.reducedMotion
      return
    }

    document.documentElement.dataset.highContrast = String(settings.highContrast)
    document.documentElement.dataset.reducedMotion = String(settings.reducedMotion)
  }, [applyDocumentPreferences, settings.highContrast, settings.reducedMotion])

  return {
    settings,
    setSettings,
    updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
      setSettings((currentSettings) => ({ ...currentSettings, [key]: value }))
    },
  }
}
