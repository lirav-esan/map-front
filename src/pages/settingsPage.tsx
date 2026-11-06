import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [highPerformance, setHighPerformance] = useState(true);
  const [minimapOpacity, setMinimapOpacity] = useState(85);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSaveSettings = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-[#1d1d1d] via-[#162225] to-[#11181a] text-[#cae9ea] font-sans p-6 md:p-10 relative overflow-x-hidden">
      
      {/* Botón de retroceso flotante */}
      <button
        onClick={() => navigate('/gameSelection')}
        className="absolute top-6 left-6 z-50 p-3 rounded-xl bg-[#273b40]/80 backdrop-blur-xl border border-[#3c4748] text-[#cae9ea] hover:bg-[#208c8c]/30 hover:border-[#208c8c] transition-all shadow-lg cursor-pointer flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium hidden sm:inline">Volver</span>
      </button>

      {/* Elementos decorativos */}
      <div className="absolute top-20 right-10 w-40 h-40 border border-[#208c8c]/15 pointer-events-none rotate-45" />

      <div className="max-w-3xl mx-auto relative z-10 pt-16">
        
        {/* Cabecera */}
        <div className="mb-8 bg-[#273b40]/50 backdrop-blur-2xl border border-[#3c4748] p-8 rounded-3xl shadow-2xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-white mb-2">
            System Settings
          </h1>
          <p className="text-[#cae9ea]/70 text-sm italic">
            Personaliza los parámetros visuales, de rendimiento y audio del sistema táctico.
          </p>
        </div>

        {savedAlert && (
          <div className="mb-6 p-4 rounded-xl bg-[#208c8c]/20 border border-[#208c8c]/50 text-[#cae9ea] text-center font-medium animate-pulse">
            Configuración guardada correctamente en el sistema.
          </div>
        )}

        {/* Controles de Configuración */}
        <div className="space-y-6">
          
          {/* Sección de Audio e Interfaz */}
          <div className="bg-[#273b40]/50 backdrop-blur-xl border border-[#3c4748] p-6 rounded-2xl shadow-xl space-y-5">
            <h2 className="text-lg font-bold text-white border-b border-[#3c4748] pb-3">Interfaz y Audio</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Efectos de Sonido UI</p>
                <p className="text-xs text-[#cae9ea]/60">Reproducir sonidos al interactuar con los mapas y menús.</p>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${soundEnabled ? 'bg-[#208c8c]' : 'bg-[#1d1d1d] border border-[#3c4748]'}`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-white">Opacidad del Panel de Filtros</span>
                <span className="text-[#208c8c] font-mono">{minimapOpacity}%</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={minimapOpacity}
                onChange={(e) => setMinimapOpacity(Number(e.target.value))}
                className="w-full accent-[#208c8c] bg-[#1d1d1d] rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Sección de Rendimiento de Mapas */}
          <div className="bg-[#273b40]/50 backdrop-blur-xl border border-[#3c4748] p-6 rounded-2xl shadow-xl space-y-5">
            <h2 className="text-lg font-bold text-white border-b border-[#3c4748] pb-3">Rendimiento de Mapas</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Aceleración por Hardware (Alta Calidad)</p>
                <p className="text-xs text-[#cae9ea]/60">Mejora la fluidez del zoom en mapas masivos de mundo abierto.</p>
              </div>
              <button
                onClick={() => setHighPerformance(!highPerformance)}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${highPerformance ? 'bg-[#208c8c]' : 'bg-[#1d1d1d] border border-[#3c4748]'}`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${highPerformance ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          {/* Botón de Guardar General */}
          <button
            onClick={handleSaveSettings}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#208c8c] to-[#176666] hover:from-[#25a0a0] hover:to-[#208c8c] text-white font-bold shadow-lg shadow-[#208c8c]/20 transition-all cursor-pointer tracking-wider uppercase text-sm"
          >
            Aplicar Cambios del Sistema
          </button>

        </div>

      </div>
    </div>
  );
};

export default SettingsPage;