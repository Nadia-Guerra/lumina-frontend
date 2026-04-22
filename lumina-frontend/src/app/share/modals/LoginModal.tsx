'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Modal from './Modal';
import { useModal } from './ModalContext';

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal } = useModal();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Conectar con API de autenticación
    closeLoginModal();
    router.push('/home');
  };

  const handleRegister = () => {
    closeLoginModal();
    router.push('/register');
  };

  return (
    <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
      {/* Card */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-2xl flex w-[660px] max-w-[95vw]">
        {/* Left - Imagen modelo */}
        <div className="relative w-[230px] min-h-[380px] flex-shrink-0">
          <Image
            src="/modal-login.png"
            alt="Modelo Lúmina"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right - Formulario */}
        <div className="flex-1 px-8 py-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-[#E8739A] mb-7 text-center">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 font-medium">
                Correo electrónico @
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu correo electrónico"
                required
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E8739A] focus:ring-2 focus:ring-[#E8739A]/20 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-500 font-medium">
                Contraseña
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#E8739A] focus:ring-2 focus:ring-[#E8739A]/20 transition-all"
              />
            </div>

            <button
              id="login-submit"
              type="submit"
              className="w-full bg-[#E8739A] hover:bg-[#d45f87] active:scale-[0.98] text-white rounded-xl py-3 font-semibold text-base transition-all mt-1 cursor-pointer"
            >
              Continuar
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-5">
            ¿Aún no tienes cuenta?{' '}
            <button
              id="go-to-register"
              onClick={handleRegister}
              className="text-[#E8739A] hover:underline font-medium cursor-pointer"
            >
              Regístrate aquí.
            </button>
          </p>
        </div>
      </div>

      {/* Back arrow */}
      <button
        id="login-modal-back"
        onClick={closeLoginModal}
        aria-label="Cerrar"
        className="mt-3 ml-1 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-pink-50 transition-colors cursor-pointer text-gray-500 text-lg"
      >
        ←
      </button>
    </Modal>
  );
}
