'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { useModal } from '@/app/share/modals/ModalContext';
import { useFavorites } from '@/hooks/useFavorites';
import { fetchProductById } from '@/infra/api/makeupApiClient';
import type { ProductFromSchema } from '@/infra/api/schemas/productSchema';

const ITEMS_PER_PAGE = 12;

export default function FavoritesPage() {
  const [page, setPage] = useState(1);
  const { openRecommendationModal } = useModal();
  const { favoriteIds, isLoaded: favsLoaded } = useFavorites();
  
  const [products, setProducts] = useState<ProductFromSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!favsLoaded) return;

    const loadProducts = async () => {
      setLoading(true);
      try {
        const promises = favoriteIds.map(id => fetchProductById(id));
        const results = await Promise.all(promises);
        // Filtramos nulos por si algún producto ya no existe
        setProducts(results.filter((p): p is ProductFromSchema => p !== null));
      } catch (e) {
        console.error('Error fetching favorite products', e);
      } finally {
        setLoading(false);
      }
    };

    if (favoriteIds.length > 0) {
      loadProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [favoriteIds, favsLoaded]);

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const visible = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const getPages = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
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
          <button
            onClick={() => openRecommendationModal(1)}
            className="shrink-0 px-6 py-2.5 bg-[#F297A0] hover:bg-[#E8739A] text-white font-semibold rounded-full transition-colors text-sm whitespace-nowrap"
          >
            Generar estilos →
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="text-[#F297A0] text-sm animate-pulse">Cargando favoritos...</span>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {visible.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                brand={p.brand}
                name={p.name}
                price={p.price}
                rating={p.rating}
                images={p.image_link ? [p.image_link] : ['/product_example.png']}
                colors={
                  p.product_colors && p.product_colors.length > 0
                    ? p.product_colors.slice(0, 5).map((c) => c.hex_value)
                    : undefined
                }
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
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-[#FFF0EA] disabled:opacity-30 transition-colors text-sm"
          >
            ›
          </button>
        </div>

      </div>
    </main>
  );
}
