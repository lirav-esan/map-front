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
  const navigate = useNavigate();

  // Filtrar juegos según la barra de búsqueda
  const filteredGames = GAMES_DATA.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectGame = (gameId: string) => {
    // Redirige al mapa respectivo usando el ID del juego seleccionado
    navigate(`/map/${gameId}`);
  };

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-[#1d1d1d] via-[#162225] to-[#11181a] text-white font-sans p-6 md:p-10 relative overflow-x-hidden">
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