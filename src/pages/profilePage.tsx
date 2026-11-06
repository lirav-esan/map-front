import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserSettings } from '../hooks/useUserSettings';

// Datos hardcodeados iniciales para favoritos y progreso (listos para mapear a la BD en el futuro)
interface FavoriteMap {
  id: string;
  title: string;
  genre: string;
  image: string;
}

interface MapProgress {
  id: string;
  title: string;
  discovered: number;
  total: number;
  percentage: number;
}

const FAVORITE_MAPS: FavoriteMap[] = [
  {
    id: 'monster-hunter',
    title: 'Monster Hunter (Shrine Ruins)',
    genre: 'Action RPG',
    image: 'https://wallpapercave.com/wp/wp12233480.jpg',
  },
  {
    id: 'honkai-star-rail',
    title: 'Honkai: Star Rail',
    genre: 'Turn-based RPG',
    image: 'https://wallpaperbat.com/img/1438576-honkai-star-rail-wallpaper-by-hoyoverse-anime-image-board.jpg',
  },
];

const MAP_PROGRESS_DATA: MapProgress[] = [
  { id: 'monster-hunter', title: 'Monster Hunter (Shrine Ruins)', discovered: 38, total: 50, percentage: 76 },
  { id: 'wuthering-waves', title: 'Wuthering Waves', discovered: 12, total: 60, percentage: 20 },
  { id: 'honkai-star-rail', title: 'Honkai: Star Rail', discovered: 45, total: 45, percentage: 100 },
];

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { settings } = useUserSettings();
  const isEnglish = settings.language === 'en';
  const text = isEnglish
    ? {
        back: 'Back', edit: 'Edit Profile', cancel: 'Cancel', account: 'Account Settings',
        username: 'Username', email: 'Email', save: 'Save Changes', worlds: 'Mapped Worlds',
        rank: 'User Rank', status: 'System Status', favorites: 'Favorite Maps', saved: 'saved',
        progress: 'Exploration Progress', collectibles: 'collectibles',
      }
    : {
        back: 'Volver', edit: 'Editar Perfil', cancel: 'Cancelar', account: 'Configuración de cuenta',
        username: 'Nombre de usuario', email: 'Correo electrónico', save: 'Guardar cambios',
        worlds: 'Mundos mapeados', rank: 'Rango de usuario', status: 'Estado del sistema',
        favorites: 'Mapas favoritos', saved: 'guardados', progress: 'Progreso de exploración',
        collectibles: 'coleccionables',
      };
  const [username, setUsername] = useState(localStorage.getItem('username') || 'Explorer');
  const [email, setEmail] = useState(localStorage.getItem('email') || 'explorer@rog.com');
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    setIsEditing(false);
    setSuccessMessage('¡Perfil actualizado con éxito!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="app-preferences min-w-screen min-h-screen bg-gradient-to-br from-[#1d1d1d] via-[#162225] to-[#11181a] text-[#cae9ea] font-sans p-6 md:p-10 relative overflow-x-hidden">
      
      {/* Botón de retroceso flotante */}
      <button
        onClick={() => navigate('/gameSelection')}
        className="absolute top-6 left-6 z-50 p-3 rounded-xl bg-[#273b40]/80 backdrop-blur-xl border border-[#3c4748] text-[#cae9ea] hover:bg-[#208c8c]/30 hover:border-[#208c8c] transition-all shadow-lg cursor-pointer flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium hidden sm:inline">{text.back}</span>
      </button>

      {/* Elementos decorativos tecnológicos de fondo */}
      <div className="absolute top-10 right-10 w-48 h-48 border border-[#208c8c]/20 pointer-events-none rotate-12" />
      <div className="absolute bottom-10 left-20 w-64 h-64 border border-[#3c4748] pointer-events-none -rotate-45" />

      <div className="max-w-4xl mx-auto relative z-10 pt-16 space-y-8">
        
        {/* Cabecera del Perfil */}
        <div className="bg-[#273b40]/50 backdrop-blur-2xl border border-[#3c4748] p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#208c8c]/10 rounded-full blur-3xl pointer-events-none" />

          {successMessage && (
            <div className="mb-6 p-3 rounded-xl bg-[#208c8c]/20 border border-[#208c8c]/50 text-[#cae9ea] text-sm text-center">
              {successMessage}
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar Holográfico */}
            <div className="relative group">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#208c8c] to-[#162225] p-1 shadow-lg shadow-[#208c8c]/20">
                <div className="w-full h-full bg-[#1d1d1d] rounded-xl flex items-center justify-center text-4xl font-bold text-[#cae9ea]">
                  {username.charAt(0).toUpperCase()}
                </div>
              </div>
              <label className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-xs font-semibold text-[#cae9ea]">
                Cambiar
                <input type="file" className="hidden" accept="image/*" onChange={() => alert('Función de subida de avatar conectada al backend.')} />
              </label>
            </div>

            {/* Información básica */}
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl font-bold text-white">{username}</h1>
              <p className="text-sm text-[#cae9ea]/70 font-mono mt-1">{email}</p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2.5 rounded-xl bg-[#208c8c]/30 border border-[#208c8c] hover:bg-[#208c8c] text-[#cae9ea] hover:text-white font-semibold transition-all shadow-md cursor-pointer"
            >
              {isEditing ? text.cancel : text.edit}
            </button>
          </div>
        </div>

        {/* Formulario de edición o Estadísticas rápidas */}
        {isEditing ? (
          <div className="bg-[#273b40]/50 backdrop-blur-2xl border border-[#3c4748] p-8 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">{text.account}</h2>
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#cae9ea]/80 mb-2">{text.username}</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1d1d1d]/80 border border-[#3c4748] text-white focus:outline-none focus:border-[#208c8c]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#cae9ea]/80 mb-2">{text.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1d1d1d]/80 border border-[#3c4748] text-white focus:outline-none focus:border-[#208c8c]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#208c8c] to-[#176666] hover:from-[#25a0a0] hover:to-[#208c8c] text-white font-bold shadow-lg shadow-[#208c8c]/20 transition-all cursor-pointer"
              >
                {text.save}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#273b40]/50 backdrop-blur-xl border border-[#3c4748] p-6 rounded-2xl shadow-xl text-center">
              <span className="text-3xl font-bold text-[#208c8c] block mb-1">03</span>
              <span className="text-xs text-[#cae9ea]/70 uppercase tracking-wider">{text.worlds}</span>
            </div>
            <div className="bg-[#273b40]/50 backdrop-blur-xl border border-[#3c4748] p-6 rounded-2xl shadow-xl text-center">
              <span className="text-3xl font-bold text-[#208c8c] block mb-1">PRO</span>
              <span className="text-xs text-[#cae9ea]/70 uppercase tracking-wider">{text.rank}</span>
            </div>
            <div className="bg-[#273b40]/50 backdrop-blur-xl border border-[#3c4748] p-6 rounded-2xl shadow-xl text-center">
              <span className="text-3xl font-bold text-[#208c8c] block mb-1">ONLINE</span>
              <span className="text-xs text-[#cae9ea]/70 uppercase tracking-wider">{text.status}</span>
            </div>
          </div>
        )}

        {/* SECCIÓN: MAPAS FAVORITOS */}
        <div className="bg-[#273b40]/50 backdrop-blur-2xl border border-[#3c4748] p-8 rounded-3xl shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center justify-between">
            <span>{text.favorites}</span>
            <span className="text-xs font-mono bg-[#208c8c]/20 text-[#208c8c] border border-[#208c8c]/40 px-3 py-1 rounded-full">
              {FAVORITE_MAPS.length} {text.saved}
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FAVORITE_MAPS.map((map) => (
              <div
                key={map.id}
                onClick={() => navigate(`/map/${map.id}`)}
                className="group flex items-center gap-4 bg-[#1d1d1d]/70 border border-[#3c4748] p-4 rounded-2xl hover:border-[#208c8c] cursor-pointer transition-all shadow-md"
              >
                <img src={map.image} alt={map.title} className="w-16 h-16 rounded-xl object-cover border border-[#3c4748] group-hover:scale-105 transition-transform" />
                <div className="flex-grow">
                  <h3 className="font-bold text-white group-hover:text-[#208c8c] transition-colors">{map.title}</h3>
                  <p className="text-xs text-[#cae9ea]/60">{map.genre}</p>
                </div>
                <svg className="w-5 h-5 text-[#cae9ea]/40 group-hover:text-[#208c8c] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* SECCIÓN: PROGRESO POR CADA MAPA */}
        <div className="bg-[#273b40]/50 backdrop-blur-2xl border border-[#3c4748] p-8 rounded-3xl shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">{text.progress}</h2>

          <div className="space-y-6">
            {MAP_PROGRESS_DATA.map((prog) => (
              <div key={prog.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-white">{prog.title}</span>
                  <span className="text-xs font-mono text-[#208c8c]">{prog.discovered} / {prog.total} {text.collectibles} ({prog.percentage}%)</span>
                </div>
                {/* Barra de Progreso Holográfica */}
                <div className="w-full h-3 bg-[#1d1d1d] rounded-full overflow-hidden border border-[#3c4748] p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#176666] to-[#208c8c] rounded-full transition-all duration-500 shadow-sm shadow-[#208c8c]"
                    style={{ width: `${prog.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;