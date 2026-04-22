'use client';

import { useModal } from './ModalContext';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

// Simulación del response del API mientras no hay integración real
const MOCK_RECOMMENDATION = {
  product: {
    id: 60,
    name: 'Revlon Super Lustrous Lipstick',
    brand: 'Revlon',
    image_link:
      'https://d3t32hsnjxo7q6.cloudfront.net/i/6618c0f47d043084550818a74e6250aa_ra,w158,h184_pa,w158,h184.jpg',
  },
  recommendation:
    '¡Hola! ¡Me encanta que tengas el Revlon Super Lustrous Lipstick! Es un clásico por una razón, ¡y con tantos tonos fabulosos, seguro que encontrarás tu pareja perfecta!\n\n**Preparación es Clave:**\n\n1. **Exfolia Suavemente:** Antes de nada, asegúrate de que tus labios estén suaves. Esto eliminará cualquier piel seca para que el color se aplique de manera uniforme.\n2. **Hidrata:** Aplica un bálsamo labial ligero y déjalo actuar unos minutos. Luego, retira el exceso con una servilleta.\n\n**Aplicación para un Look Impecable:**\n\n3. **Define (Opcional):** Usa un perfilador de labios del mismo tono o ligeramente más claro. Dibuja suavemente el contorno de tus labios.\n4. **Aplica Directamente o con Brocha:** Puedes aplicar el labial directamente o con una brocha para mayor precisión.\n5. **Sella (Opcional):** Coloca una servilleta sobre tus labios y presiona suavemente. Aplica una segunda capa fina. ¡Esto ayuda a que el color se fije!\n\n¡Disfruta de tus labios espectaculares! ¡Te verás y te sentirás increíble!',
};

function renderMarkdown(text: string) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <div key={i} className="h-2" />;

    const numberedMatch = line.match(/^(\d+)\.\s\*\*(.+?)\*\*[:\s]*(.*)/);
    if (numberedMatch) {
      return (
        <p key={i} className="text-gray-600 text-sm leading-relaxed mb-1">
          <span className="font-semibold text-gray-700">
            {numberedMatch[1]}. {numberedMatch[2]}:
          </span>{' '}
          {numberedMatch[3]}
        </p>
      );
    }

    const parts = line.split(/\*\*(.+?)\*\*/g);
    const rendered = parts.map((part, j) =>
      j % 2 === 1 ? (
        <span key={j} className="font-semibold text-gray-700">
          {part}
        </span>
      ) : (
        part
      )
    );

    return (
      <p key={i} className="text-gray-600 text-sm leading-relaxed mb-1">
        {rendered}
      </p>
    );
  });
}

export default function RecommendationModal() {
  const { isRecommendationModalOpen, closeRecommendationModal } = useModal();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRecommendationModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeRecommendationModal]);

  if (!isRecommendationModalOpen) return null;

  const { product, recommendation } = MOCK_RECOMMENDATION;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-2xl border border-gray-100 relative flex flex-col max-h-[90vh]">

        {/* Header fijo */}
        <div className="flex items-center gap-4 px-8 pt-8 pb-6 border-b border-gray-100 shrink-0">
          <div className="w-14 h-14 rounded-xl bg-[#FFF0EA] flex items-center justify-center overflow-hidden shrink-0 border border-orange-50">
            <Image
              src={product.image_link}
              alt={product.name}
              width={56}
              height={56}
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-[#F297A0] uppercase tracking-widest truncate">
              {product.brand}
            </p>
            <h2 className="text-base font-semibold text-gray-800 leading-snug truncate">
              {product.name}
            </h2>
          </div>
          <button
            onClick={closeRecommendationModal}
            className="text-gray-300 hover:text-gray-500 transition-colors text-xl leading-none shrink-0 ml-2"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Etiqueta */}
        <div className="px-8 pt-5 shrink-0">
          <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">
            Recomendación:
          </span>
        </div>

        {/* Contenido scrolleable */}
        <div
          ref={scrollRef}
          className="px-8 pt-3 pb-6 overflow-y-auto flex flex-col gap-0.5 flex-1"
        >
          {renderMarkdown(recommendation)}
        </div>

        {/* Footer fijo */}
        <div className="flex justify-end px-8 py-5 border-t border-gray-100 shrink-0">
          <button
            onClick={closeRecommendationModal}
            className="px-8 py-2.5 bg-[#F297A0] hover:bg-[#E8739A] text-white font-semibold rounded-full transition-colors text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
