import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ComingSoonPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#1d1d1d] via-[#162225] to-[#11181a] flex items-center justify-center font-sans text-white p-6">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-[#208c8c]/20 pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full border-2 border-[#208c8c]/30 pointer-events-none" />
      <div className="absolute top-20 right-20 w-24 h-24 border-2 border-[#208c8c]/20 rotate-45 pointer-events-none" />

      {/* Tarjeta central con efecto Glassmorphism */}
      <div className="w-full max-w-md bg-purple-950/15 backdrop-blur-xl border border-purple-500/30 p-8 rounded-3xl shadow-2xl text-center relative z-10 space-y-6">
        
        {/* Icono de advertencia / construcción animado */}
        <div className="w-20 h-20 mx-auto bg-purple-600/15 border border-[#208c8c]/30 rounded-2xl flex items-center justify-center text-purple-300 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 animate-pulse text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-wide mb-2 drop-shadow-md">
            Oops, we still have some work to do!
          </h1>
          <p className="text-purple-200 text-sm font-light italic leading-relaxed">
            We're currently building this map, please check back later for updates. In the meantime, feel free to explore our other available worlds or return to the game selection page.
          </p>
        </div>

        {/* Botón para regresar al dashboard */}
        <button
          onClick={() => navigate('/gameSelection')}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-600/30 transition-all duration-200 transform active:scale-[0.98] cursor-pointer"
        >
          Volver a Selección de Juegos
        </button>

      </div>
    </div>
  );
};

export default ComingSoonPage;