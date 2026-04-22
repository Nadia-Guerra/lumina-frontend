'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useModal } from '../modals/ModalContext';

export default function Navbar() {
  const { openLoginModal, openProfileModal } = useModal();
  const pathname = usePathname();

  const isLanding = pathname === '/';
  const isRegister = pathname === '/register';

  if (isRegister) return null;


  const links = isLanding
    ? [
        { label: 'Inicio', href: '/' },
        { label: 'Productos', href: '/#productos' },
      ]
    : [
        { label: 'Productos', href: '/home' },
        { label: 'Favoritos', href: '/favorites' },
      ];

  const buttonText = isLanding ? 'Iniciar Sesión' : 'Perfil';

  const handleButtonClick = () => {
    if (isLanding) {
      openLoginModal();
    } else {
      openProfileModal();
    }
  };

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
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#F297A0] hover:bg-[#F297AB] hover:text-white px-5 py-2 rounded-full text-sm font-semibold transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          id={isLanding ? "navbar-login-btn" : "navbar-profile-btn"}
          onClick={handleButtonClick}
          className="bg-[#F297A0] hover:bg-[#F297AB] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all active:scale-95 cursor-pointer shadow-sm"
        >
          {buttonText}
        </button>
      </div>
    </nav>
  );
}
