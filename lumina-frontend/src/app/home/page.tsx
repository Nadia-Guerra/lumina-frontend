'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import ProductCard from '@/components/ProductCard';
import SearchWithPagination from '@/components/SearchWithPagination';
import { fetchProducts } from '@/infra/api/makeupApiClient';
import type { Product } from '@/domain/entities/Product';
import { PRODUCT_BRANDS } from '@/domain/entities/Product';

const ITEMS_PER_PAGE = 12;

export default function HomePage() {
  const [products, setProducts]   = useState<Product[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [search, setSearch]       = useState('');
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [page, setPage]           = useState(1);

  const loadProducts = useCallback(async (brand: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(brand ? { brand } : {});
      setProducts(data);
    } catch (e) {
      setError('No se pudieron cargar los productos. Intenta de nuevo.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(activeBrand);
  }, [activeBrand, loadProducts]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q),
    );
  }, [products, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleSearchChange = (v: string) => {
    setSearch(v);
    setPage(1);
  };

  const handleBrandChange = (b: string | null) => {
    setActiveBrand(b);
    setPage(1);
    setSearch('');
  };

  return (
    <main className="flex flex-col flex-1 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex flex-col gap-8">

        <h1 className="text-sm font-bold text-[#F297A0] tracking-widest uppercase">
          Explora los productos de la plataforma..
        </h1>

        <SearchWithPagination
          brands={[...PRODUCT_BRANDS]}
          value={search}
          onChange={handleSearchChange}
          activeBrand={activeBrand}
          onBrandChange={handleBrandChange}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        {loading && (
          <div className="flex justify-center py-20">
            <span className="text-[#F297A0] text-sm animate-pulse">Cargando productos...</span>
          </div>
        )}

        {error && !loading && (
          <div className="flex flex-col items-center py-16 gap-3 text-center">
            <span className="text-3xl">⚠️</span>
            <p className="text-gray-500 text-sm">{error}</p>
            <button
              onClick={() => loadProducts(activeBrand)}
              className="px-5 py-2 bg-[#F297A0] hover:bg-[#E8739A] text-white text-sm font-semibold rounded-full transition-colors"
            >
              Reintentar
            </button>
          </div>
        )}

        {!loading && !error && paginated.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginated.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                brand={p.brand}
                name={p.name}
                price={p.price}
                rating={p.rating}
                images={p.image_link ? [p.image_link] : ['/product_example.png']}
                colors={
                  p.product_colors.length > 0
                    ? p.product_colors.slice(0, 5).map((c) => c.hex_value)
                    : undefined
                }
              />
            ))}
          </div>
        )}

        {!loading && !error && paginated.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-2 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-gray-500 text-sm">No encontramos productos con esa búsqueda.</p>
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <SearchWithPagination
              brands={[]}
              value=""
              onChange={() => {}}
              activeBrand={null}
              onBrandChange={() => {}}
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}

      </div>
    </main>
  );
}
