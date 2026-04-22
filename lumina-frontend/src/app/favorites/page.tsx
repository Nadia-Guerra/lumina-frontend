'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

const COLORS_A = ['#F297A0', '#E8739A', '#C0504D', '#8B2635', '#5C1A2A'];
const COLORS_B = ['#FBBFC7', '#F297A0', '#D95F7B', '#A33050', '#6B1A30'];

const MOCK_FAVORITES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  brand: 'Rare Beauty',
  name: `Producto ${i + 1}`,
  price: 6.0,
  rating: 4.9,
  images: ['/product_example.png'],
  colors: i % 2 === 0 ? COLORS_A : COLORS_B,
}));

const TOTAL_PAGES = 5;

export default function FavoritesPage() {
  const [page, setPage] = useState(1);
  const [likedIds, setLikedIds] = useState<Set<number>>(
    new Set(MOCK_FAVORITES.map((p) => p.id))
  );

  const visible = MOCK_FAVORITES.filter((p) => likedIds.has(p.id));

  const handleLikeChange = (id: number, liked: boolean) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (liked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const getPages = () => {
    const pages: (number | '...')[] = [];
    if (TOTAL_PAGES <= 7) return Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(TOTAL_PAGES - 1, page + 1); i++) pages.push(i);
    if (page < TOTAL_PAGES - 2) pages.push('...');
    pages.push(TOTAL_PAGES);
    return pages;
  };

  return (
    <main className="flex flex-col flex-1 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <h1 className="text-sm font-bold text-[#F297A0] tracking-widest uppercase max-w-xs leading-relaxed">
            Explora tus favoritos y genera recomendaciones personalizadas
          </h1>
          <button className="shrink-0 px-6 py-2.5 bg-[#F297A0] hover:bg-[#E8739A] text-white font-semibold rounded-full transition-colors text-sm whitespace-nowrap">
            Generar estilos →
          </button>
        </div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {visible.map((p) => (
              <ProductCard
                key={p.id}
                {...p}
                defaultLiked={true}
                onLikeChange={(liked) => handleLikeChange(p.id, liked)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
            <span className="text-5xl">🤍</span>
            <p className="text-gray-400 text-sm">Aún no tienes favoritos guardados.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-1 pt-4 pb-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#FFF0EA] disabled:opacity-30 transition-colors text-sm"
          >
            ‹
          </button>
          {getPages().map((p, i) =>
            p === '...' ? (
              <span key={`e-${i}`} className="w-8 h-8 flex items-center justify-center text-gray-300 text-sm">…</span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p as number)}
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  page === p ? 'bg-[#F297A0] text-white' : 'text-gray-400 hover:bg-[#FFF0EA]'
                }`}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setPage((p) => Math.min(TOTAL_PAGES, p + 1))}
            disabled={page === TOTAL_PAGES}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#FFF0EA] disabled:opacity-30 transition-colors text-sm"
          >
            ›
          </button>
        </div>

      </div>
    </main>
  );
}
