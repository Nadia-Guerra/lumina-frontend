'use client';

import { useModal } from './ModalContext';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function ProfileModal() {
  const { isProfileModalOpen, closeProfileModal } = useModal();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProfileModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeProfileModal]);

  if (!isProfileModalOpen) return null;

  const handleLogout = async () => {
    await logout();
    closeProfileModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm px-4"
      onClick={closeProfileModal}
    >
      <div
        className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.10)] w-full max-w-md px-10 py-10 flex flex-col items-center gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-[#F297A0] flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-14 h-14">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>

        {/* Profile fields */}
        <div className="w-full flex flex-col gap-4">
          {[
            { label: 'Nombre de usuario', value: user?.username ?? '—' },
            { label: 'Correo', value: user?.email ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-gray-700 text-sm font-medium">{label}</span>
              <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-500 text-sm bg-gray-50/50">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Cerrar sesión */}
        <button
          onClick={handleLogout}
          className="mt-2 px-10 py-2.5 bg-[#FBBFC7] hover:bg-[#F297A0] text-white font-semibold rounded-full transition-colors text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
