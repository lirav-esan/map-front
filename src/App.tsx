import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import GameSelectionPage from './pages/gameSelection'
import MapPage from './pages/mapPage'
import ComingSoonPage from './pages/comingSoon'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/gameSelection" element={<GameSelectionPage />} />
      <Route path="/map/:gameId" element={<MapPage />} />
      <Route path="/comingSoon" element={<ComingSoonPage />} />
    </Routes>
  )
}
