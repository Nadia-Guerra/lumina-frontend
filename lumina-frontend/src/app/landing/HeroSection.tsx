'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HeroSection() {
  const router = useRouter();
  return (
    <section
      id="inicio"
      className="relative w-full min-h-[600px] flex items-center overflow-hidden"
    >
      <Image
        src="/landing-background.png"
        alt="Fondo landing Lúmina"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex items-center justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-sm">
          <h1 className="font-black uppercase leading-tight" style={{ fontSize: 'clamp(3rem, 5vw, 4rem)' }}>
            <span className="text-[#7A8C3A] block">Match con tu</span>
            <span className="text-[#E8739A] block">Maquillaje Ideal</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Encuentra, prueba y elige el maquillaje<br />perfecto para ti
          </p>
          <button
            id="hero-cta-btn"
            onClick={() => router.push('/register')}
            className="self-start bg-[#E8739A] hover:bg-[#d45f87] text-white px-6 py-2.5 rounded-full text-lg font-semibold transition-all active:scale-95 cursor-pointer shadow-md mt-2"
          >
            Comienza ahora
          </button>
        </div>

        <div className="relative w-[400px] h-[500px] flex-shrink-0 hidden md:block">
          <Image
            src="/rightup-side-landing.png"
            alt="Productos de maquillaje"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
