import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Game {
  id: string;
  title: string;
  genre: string;
  image: string;
}

const GAMES_DATA: Game[] = [
  { 
    id: 'monster-hunter', 
    title: 'Monster Hunter', 
    genre: 'Action RPG', 
    image: 'https://wallpapercave.com/wp/wp12233480.jpg' 
  },
  { 
    id: 'wuthering-waves', 
    title: 'Wuthering Waves', 
    genre: 'Action RPG', 
    image: 'https://4kwallpapers.com/images/walls/thumbs_3t/24686.jpg' 
  },
  { 
    id: 'honkai-star-rail', 
    title: 'Honkai: Star Rail', 
    genre: 'Turn-based RPG', 
    image: 'https://wallpaperbat.com/img/1438576-honkai-star-rail-wallpaper-by-hoyoverse-anime-image-board.jpg' 
  },
  { 
    id: 'babys-nightmare', 
    title: "Baby's Nightmare Circus", 
    genre: 'Horror / Survival', 
    image: 'https://m.gjcdn.net/fireside-post-image/900/26348326-ibnwqqhe-v4.jpg' 
  },
];

export const GameSelectionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'Player';

  // Filtrar juegos según la barra de búsqueda
  const filteredGames = GAMES_DATA.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectGame = (gameId: string) => {
    // Redirige al mapa respectivo usando el ID del juego seleccionado
    navigate(`/map/${gameId}`);
  };

  const handleLogout = () => {
    // Limpiar credenciales y redirigir al login
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-[#1d1d1d] via-[#162225] to-[#11181a] text-white font-sans p-6 md:p-10 relative overflow-x-hidden">
      {/* Botón flotante de Perfil / Menú en la esquina superior derecha */}
      <div className="absolute top-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            {/* Icono de usuario / Avatar placeholder */}
            <div className="w-9 h-9 rounded-full bg-[#208c8c]/30 border border-[#208c8c] flex items-center justify-center text-[#cae9ea] font-bold text-sm">
              {username.charAt(0).toUpperCase()}
            </div>
            <svg 
              className={`w-4 h-4 text-[#cae9ea] transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Menú Desplegable */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#273b40] backdrop-blur-2xl border border-[#3c4748] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-[#3c4748] mb-1">
                <p className="text-xs text-[#cae9ea]/60">Conectado como</p>
                <p className="text-sm font-semibold text-[#cae9ea] truncate">{username}</p>
              </div>

              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate('/profile');
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-[#cae9ea] hover:bg-[#208c8c]/20 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-[#208c8c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Mi Perfil
              </button>

              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate('/settings');
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-[#cae9ea] hover:bg-[#208c8c]/20 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-[#208c8c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Configuración
              </button>

              <div className="border-t border-[#3c4748] my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-300 hover:bg-red-500/20 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full border-4 border-purple-400/10 pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full border-2 border-purple-500/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header estilo dashboard */}
        <div className="mb-8 bg-[#273b40]/50 backdrop-blur-xl backdrop-blur-xl border border-[#3c4748] p-8 rounded-3xl shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow-lg mb-2">
            Game Selection
          </h1>
          <p className="text-[#cae9ea] text-lg font-light italic mb-6">
            Which game map are you exploring today? Select a world to load its interactive layout.
          </p>

          {/* Barra de búsqueda interactiva */}
          <div className="relative max-w-xl">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a game..."
              className="w-full px-5 py-3.5 pl-12 rounded-xl bg-[#273b40]/50 backdrop-blur-xl border border-[#3c4748] text-white placeholder-[#cae9ea]/40 focus:outline-none focus:border-[#208c8c]/40 focus:ring-2 focus:ring-purple-400/20 transition-all"
            />
            <svg
              className="absolute left-4 top-4 h-5 w-5 text-[#cae9ea] pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Sección de Juegos / Matriz */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-purple-100 flex items-center gap-3">
            <span>Available Worlds</span>
            <span className="text-xs bg-purple-600/50 border border-[#208c8c]/40 px-3 py-1 rounded-full text-[#cae9ea]">
              {filteredGames.length} games
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                onClick={() => handleSelectGame(game.id)}
                className="bg-[#273b40]/50 backdrop-blur-xl backdrop-blur-xl border border-[#208c8c]/40 rounded-2xl overflow-hidden shadow-xl hover:border-[#208c8c]/40 hover:shadow-purple-600/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer group flex flex-col"
              >
                {/* Imagen de portada */}
                <div className="relative h-48 overflow-hidden bg-purple-900">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent" />
                </div>

                {/* Detalles de la tarjeta */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#cae9ea]/70 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-sm text-[#cae9ea]/70/80 mt-1">
                      {game.genre}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#208c8c]/40 flex items-center justify-between text-xs text-[#cae9ea]/70">
                    <span className="group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1 font-semibold text-[#cae9ea]">
                      Explore Map &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-20 bg-purple-950/20 rounded-2xl border border-[#3c4748]">
              <p className="text-[#cae9ea]/70 text-lg">No games found matching your search.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default GameSelectionPage;