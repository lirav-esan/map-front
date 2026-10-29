import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  //login tradicional
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5261/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // El backend devuelve texto plano en los errores (ej. "Credenciales inválidas.")
        const errorText = await response.text();
        throw new Error(errorText || 'Error al iniciar sesión');
      }

      const data = await response.json();

      // Guardar token y datos del usuario
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);

      if (rememberMe) {
        localStorage.setItem('savedEmail', email);
      }

      navigate('/map');
    } catch (err: any) {
      setError(err.message || 'Credenciales inválidas o error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  //login manejado con google
  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError('');
    setLoading(true);

    try {
      // credentialResponse.credential es el IdToken que valida GoogleJsonWebSignature en tu backend
      const idToken = credentialResponse.credential;

      const response = await fetch('http://localhost:5261/api/Auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al autenticar con Google');
      }

      const data = await response.json();

      // Guardar sesión
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);

      navigate('/map');
    } catch (err: any) {
      setError(err.message || 'No se pudo iniciar sesión con Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-900 to-purple-900 flex items-center justify-center font-sans">
      {/* Elementos decorativos de fondo estilo gaming / fantasía */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-purple-400/20 pointer-events-none" />
      <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full border-2 border-purple-500/30 pointer-events-none" />
      <div className="absolute top-20 right-20 w-24 h-24 border-2 border-purple-400/20 rotate-45 pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-64 h-64 rounded-full border border-purple-400/10 pointer-events-none" />

      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Lado Izquierdo: Bienvenida */}
        <div className="text-white mb-10 md:mb-0 md:max-w-xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide drop-shadow-lg mb-8 italic">
            Welcome back!
          </h1>
          <p className="text-xl text-purple-200 tracking-wider font-light">
            Ready to grind your favorite games? Sign in and start exploring...
          </p>
        </div>

        {/* Lado Derecho: Tarjeta de Login (Glassmorphism) */}
        <div className="w-full max-w-md bg-purple-950/40 backdrop-blur-xl border border-purple-500/30 p-8 rounded-2xl shadow-2xl shadow-purple-950/50">
          
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo Email */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-purple-900/50 border border-purple-500/30 text-white placeholder-purple-400/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
              />
            </div>

            {/* Campo Password */}
            <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                    Password
                </label>
                <div className="relative">
                    <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-purple-900/50 border border-purple-500/30 text-white placeholder-purple-400/60 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all [&::-ms-reveal]:hidden"
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-purple-300 hover:text-white transition-colors cursor-pointer"
                    >
                    {showPassword ? (
                        // Icono de ojo cerrado (Ocultar)
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                    ) : (
                        // Icono de ojo abierto (Ver)
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                    </button>
                </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-purple-900/50 border-purple-500/40 text-purple-600 focus:ring-purple-400"
                />
                <span className="text-sm text-purple-200">Remember me</span>
              </label>
            </div>

            {/* Botón Sign In */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-600/30 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'SIGN IN'}
            </button>

            {/* Separador */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-purple-500/30"></div>
              <span className="px-3 text-xs text-purple-300 uppercase">O continuar con</span>
              <div className="flex-grow border-t border-purple-500/30"></div>
            </div>

            {/* Botón de Google */}
            <div className="flex justify-center w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Error al autenticar con Google')}
                theme="outline"
                shape="pill"
                size="medium"
                width="100%"
              />
            </div>

            {/* Enlaces inferiores */}
            <div className="flex flex-col space-y-3 pt-2 text-center text-sm">
              <p className="text-purple-300">
                Don't have an account?{' '}
                <a href="/register" className="text-white font-semibold underline hover:text-purple-200 transition-colors">
                  Sign Up
                </a>
              </p>
              <a href="#forgot" className="text-purple-400 hover:text-purple-300 transition-colors">
                Forgot Password
              </a>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;