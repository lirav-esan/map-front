import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserSettings, useUserSettings, type UserSettings } from '../hooks/useUserSettings';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSetting } = useUserSettings();
  const [savedAlert, setSavedAlert] = useState(false);

  const isEnglish = settings.language === 'en';
  const text = isEnglish
    ? {
        back: 'Back',
        title: 'System Settings',
        description: 'Customize visual, performance, and audio preferences for your map experience.',
        saved: 'Settings saved in this browser.',
        interface: 'Interface and Audio',
        sound: 'UI sound effects',
        soundDescription: 'Play sounds when interacting with maps and menus.',
        contrast: 'High contrast mode',
        contrastDescription: 'Increase contrast to make text and controls easier to see.',
        opacity: 'Filter panel opacity',
        performance: 'Map Performance',
        reducedMotion: 'Reduce animations',
        reducedMotionDescription: 'Disable decorative animations to reduce browser workload.',
        language: 'Language',
        languageDescription: 'Choose the language used on this page.',
        spanish: 'Spanish',
        english: 'English',
        apply: 'Apply settings',
      }
    : {
        back: 'Volver',
        title: 'Configuración del sistema',
        description: 'Personaliza las preferencias visuales, de rendimiento y audio del mapa.',
        saved: 'Configuración guardada en este navegador.',
        interface: 'Interfaz y audio',
        sound: 'Efectos de sonido de la interfaz',
        soundDescription: 'Reproducir sonidos al interactuar con mapas y menús.',
        contrast: 'Modo de alto contraste',
        contrastDescription: 'Aumentar el contraste para facilitar la lectura de textos y controles.',
        opacity: 'Opacidad del panel de filtros',
        performance: 'Rendimiento de mapas',
        reducedMotion: 'Reducir animaciones',
        reducedMotionDescription: 'Desactivar animaciones decorativas para reducir el trabajo del navegador.',
        language: 'Idioma',
        languageDescription: 'Elige el idioma utilizado en esta página.',
        spanish: 'Español',
        english: 'Inglés',
        apply: 'Aplicar configuración',
      };

  const handleSaveSettings = () => {
    saveUserSettings(settings);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2500);
  };

  const panelClass = settings.highContrast
    ? 'bg-black border-white'
    : 'bg-[#273b40]/50 border-[#3c4748]';
  const controlClass = settings.highContrast
    ? 'bg-black border-white text-white'
    : 'bg-[#1d1d1d] border-[#3c4748]';

  return (
    <main className={`app-preferences min-w-screen min-h-screen font-sans p-6 md:p-10 relative overflow-x-hidden ${settings.highContrast ? 'bg-black text-white' : 'bg-gradient-to-br from-[#1d1d1d] via-[#162225] to-[#11181a] text-[#cae9ea]'}`}>
      
      {/* Botón de retroceso flotante */}
      <button
        onClick={() => navigate('/gameSelection')}
        aria-label={text.back}
        className={`absolute top-6 left-6 z-50 p-3 rounded-xl backdrop-blur-xl border text-inherit hover:bg-[#208c8c]/30 hover:border-[#208c8c] transition-all shadow-lg cursor-pointer flex items-center gap-2 ${panelClass}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium hidden sm:inline">{text.back}</span>
      </button>

      {/* Elementos decorativos */}
      <div className="absolute top-20 right-10 w-40 h-40 border border-[#208c8c]/15 pointer-events-none rotate-45" />

      <div className="max-w-3xl mx-auto relative z-10 pt-16">
        
        {/* Cabecera */}
        <div className={`mb-8 backdrop-blur-2xl border p-8 rounded-3xl shadow-2xl ${panelClass}`}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-inherit mb-2">{text.title}</h1>
          <p className="text-inherit opacity-70 text-sm italic">{text.description}</p>
        </div>

        {savedAlert && (
          <div className="mb-6 p-4 rounded-xl bg-[#208c8c]/20 border border-[#208c8c]/50 text-inherit text-center font-medium" role="status" aria-live="polite">
            {text.saved}
          </div>
        )}

        {/* Controles de Configuración */}
        <div className="space-y-6">
          
          {/* Sección de Audio e Interfaz */}
          <section className={`backdrop-blur-xl border p-6 rounded-2xl shadow-xl space-y-5 ${panelClass}`} aria-labelledby="interface-title">
            <h2 id="interface-title" className="text-lg font-bold text-inherit border-b border-current/40 pb-3">{text.interface}</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{text.sound}</p>
                <p className="text-xs opacity-60">{text.soundDescription}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.soundEnabled}
                aria-label={text.sound}
                onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${settings.soundEnabled ? 'bg-[#208c8c]' : controlClass}`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <div className="flex justify-between text-sm">
                <label htmlFor="minimap-opacity" className="font-semibold">{text.opacity}</label>
                <output htmlFor="minimap-opacity" className="text-[#208c8c] font-mono">{settings.minimapOpacity}%</output>
              </div>
              <input
                id="minimap-opacity"
                type="range"
                min="40"
                max="100"
                value={settings.minimapOpacity}
                onChange={(e) => updateSetting('minimapOpacity', Number(e.target.value))}
                aria-label={text.opacity}
                className="w-full accent-[#208c8c] bg-[#1d1d1d] rounded-lg cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{text.contrast}</p>
                <p className="text-xs opacity-60">{text.contrastDescription}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.highContrast}
                aria-label={text.contrast}
                onClick={() => updateSetting('highContrast', !settings.highContrast)}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${settings.highContrast ? 'bg-[#208c8c]' : controlClass}`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${settings.highContrast ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </section>

          <section className={`backdrop-blur-xl border p-6 rounded-2xl shadow-xl space-y-5 ${panelClass}`} aria-labelledby="performance-title">
            <h2 id="performance-title" className="text-lg font-bold text-inherit border-b border-current/40 pb-3">{text.performance}</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{text.reducedMotion}</p>
                <p className="text-xs opacity-60">{text.reducedMotionDescription}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.reducedMotion}
                aria-label={text.reducedMotion}
                onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${settings.reducedMotion ? 'bg-[#208c8c]' : controlClass}`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${settings.reducedMotion ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </section>

          <section className={`backdrop-blur-xl border p-6 rounded-2xl shadow-xl space-y-4 ${panelClass}`} aria-labelledby="language-title">
            <h2 id="language-title" className="text-lg font-bold text-inherit border-b border-current/40 pb-3">{text.language}</h2>
            <label htmlFor="language" className="text-sm opacity-70">{text.languageDescription}</label>
            <select
              id="language"
              value={settings.language}
              onChange={(event) => updateSetting('language', event.target.value as UserSettings['language'])}
              className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#208c8c] ${controlClass}`}
            >
              <option value="es">{text.spanish}</option>
              <option value="en">{text.english}</option>
            </select>
          </section>

          {/* Botón de Guardar General */}
          <button
            onClick={handleSaveSettings}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#208c8c] to-[#176666] hover:from-[#25a0a0] hover:to-[#208c8c] text-white font-bold shadow-lg shadow-[#208c8c]/20 transition-all cursor-pointer tracking-wider uppercase text-sm"
          >
            {text.apply}
          </button>

        </div>

      </div>
    </main>
  );
};

export default SettingsPage;