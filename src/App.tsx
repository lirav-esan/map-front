import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import GameSelectionPage from './pages/gameSelection'
import MapPage from './pages/mapPage'
import ComingSoonPage from './pages/comingSoon'
import SettingsPage from './pages/settingsPage'
import ProfilePage from './pages/profilePage'
import { useUserSettings } from './hooks/useUserSettings'

function UserPreferences() {
  const location = useLocation()
  const isPublicRoute = location.pathname === '/login' || location.pathname === '/register'
  useUserSettings(!isPublicRoute)

  return null
}

export default function App() {
  return (
    <>
      <UserPreferences />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/gameSelection" element={<GameSelectionPage />} />
        <Route path="/map/:gameId" element={<MapPage />} />
        <Route path="/comingSoon" element={<ComingSoonPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  )
}
