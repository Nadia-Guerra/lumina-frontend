'use client';

import Link from 'next/link';
import { useModal } from '../modals/ModalContext';

export default function Navbar() {
  const { openLoginModal } = useModal();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-pink-100 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <span
          className="text-2xl text-[#E8739A] tracking-wide select-none"
          style={{ fontFamily: 'var(--font-montserrat-alternates), cursive', fontStyle: 'italic' }}
        >
          Lúmina
        </span>

        <div className="flex items-center gap-10">
          <Link
            href="/home"
            className="text-[#F297A0] hover:text-[#d45f87] text-sm font-medium transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/favorites"
            className="text-[#F297A0] hover:text-[#d45f87] text-sm font-medium transition-colors"
          >
            Favoritos
          </Link>
        </div>

        <button
          id="navbar-login-btn"
          onClick={openLoginModal}
          className="bg-[#F297A0] hover:bg-[#d45f87] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          Perfil
        </button>
      </div>
    </nav>
  );
}
