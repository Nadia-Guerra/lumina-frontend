'use client';

import { useModal } from './ModalContext';
import { useRecommendation } from '@/hooks/useRecommendation';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

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
        <span key={j} className="font-semibold text-gray-700">{part}</span>
      ) : (
        part
      ),
    );

    return (
      <p key={i} className="text-gray-600 text-sm leading-relaxed mb-1">
        {rendered}
      </p>
    );
  });
}

export default function RecommendationModal() {
  const { isRecommendationModalOpen, recommendationId, closeRecommendationModal } = useModal();
  const { recommendation, isLoading, error, fetchRecommendation } = useRecommendation();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (isRecommendationModalOpen && recommendationId !== null) {
      fetchRecommendation(recommendationId);
    }
  }, [isRecommendationModalOpen, recommendationId, fetchRecommendation]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRecommendationModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeRecommendationModal]);

  if (!isRecommendationModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-2xl border border-gray-100 relative flex flex-col max-h-[90vh]">

        {/* Header fijo */}
        <div className="flex items-center gap-4 px-8 pt-8 pb-6 border-b border-gray-100 shrink-0">
          {isLoading ? (
            <div className="flex items-center gap-3 flex-1">
              <div className="w-14 h-14 rounded-xl bg-gray-100 animate-pulse shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-40 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-sm flex-1">{error}</p>
          ) : recommendation ? (
            <>
              <div className="w-14 h-14 rounded-xl bg-[#FFF0EA] flex items-center justify-center overflow-hidden shrink-0 border border-orange-50">
                <Image
                  src={recommendation.styleImg}
                  alt={recommendation.style}
                  width={56}
                  height={56}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#F297A0] uppercase tracking-widest truncate">
                  Estilo recomendado
                </p>
                <h2 className="text-base font-semibold text-gray-800 leading-snug truncate">
                  {recommendation.style}
                </h2>
              </div>
            </>
          ) : null}

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
          {isLoading && (
            <div className="flex flex-col gap-2 mt-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-100 rounded animate-pulse" style={{ width: `${70 + (i % 3) * 10}%` }} />
              ))}
            </div>
          )}
          {!isLoading && recommendation && renderMarkdown(recommendation.description)}
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
