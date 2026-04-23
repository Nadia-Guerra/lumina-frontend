'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth, parseAuthError } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError]     = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await register(form.email, form.password, form.username);
      router.push('/home');
    } catch (err) {
      setError(parseAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] flex items-center overflow-hidden">
      <Image
        src="/register-bckground.png"
        alt="Fondo registro Lúmina"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 flex items-center justify-between gap-8 py-10">

        <div className="hidden md:flex flex-col gap-2 max-w-sm">
          <h2
            className="font-black uppercase leading-none"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}
          >
            <span className="text-[#A8B84B] block">Tu estilo,</span>
            <span className="text-[#F4A0B8] block">Tu esencia</span>
          </h2>
        </div>

        <div className="w-full max-w-[420px] ml-auto bg-white rounded-2xl shadow-2xl px-8 py-9 flex flex-col gap-5">
          <h1 className="text-center text-xl font-black uppercase tracking-widest text-[#E8739A]">
            Crea una cuenta
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium">Nombre de usuario</label>
              <input
                id="register-username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="Tu nombre de usuario"
                required
                minLength={2}
                maxLength={50}
                disabled={isLoading}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E8739A] focus:ring-2 focus:ring-[#E8739A]/20 transition-all disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium">Email @</label>
              <input
                id="register-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                required
                disabled={isLoading}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E8739A] focus:ring-2 focus:ring-[#E8739A]/20 transition-all disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium">Contraseña</label>
              <input
                id="register-password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
                disabled={isLoading}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E8739A] focus:ring-2 focus:ring-[#E8739A]/20 transition-all disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium">Confirmar Contraseña</label>
              <input
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                required
                disabled={isLoading}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E8739A] focus:ring-2 focus:ring-[#E8739A]/20 transition-all disabled:opacity-60"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center">
                {error}
              </p>
            )}

            <button
              id="register-submit"
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E8739A] hover:bg-[#d45f87] active:scale-[0.98] text-white rounded-xl py-3 font-semibold text-base transition-all mt-1 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Registrarse'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Back arrow */}
      <button
        id="register-back"
        onClick={() => router.push('/')}
        aria-label="Volver al inicio"
        className="absolute bottom-6 left-6 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-pink-50 transition-colors cursor-pointer text-gray-500 text-lg"
      >
        ←
      </button>
    </div>
  );
}
