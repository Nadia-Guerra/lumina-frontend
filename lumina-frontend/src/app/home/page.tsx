'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import SearchWithPagination from '@/components/SearchWithPagination';

const BRANDS = [
'alva',
"anna sui",
"annabelle",
"benefit",
"boosh",
"burt's bees",
"butter london",
"c'est moi",
"cargo cosmetics",
"china glaze",
"clinique",
"coastal classic creation",
"colourpop",
"covergirl",
'dalish',
'deciem',
'dior',
'dr. hauschka',
'e.l.f.',
'essie',
'fenty',
'glossier',
'green people',
'iman',
"l'oreal",
"lotus cosmetics usa",
"maia's mineral galaxy",
"marcelle",
"marienatie",
"maybelline",
"milani",
'mineral fusion',
'misa',
'mistura',
'moov',
'nudus',
'nyx',
'orly',
'pacifica',
'penny lane organics',
'physicians formula',
'piggy paint',
'pure anada',
'rejuva minerals',
'revlon',
"sally b's",
"skin yummies",
'salon perfect',
'sante',
'sinful colours',
'smashbox',
'stila',
'suncoat',
'w3llpeople',
'wet n wild',
'zorah',
'zorah biocosmetiques'
];

const COLORS_A = ['#F297A0', '#E8739A', '#C0504D', '#8B2635', '#5C1A2A'];
const COLORS_B = ['#FBBFC7', '#F297A0', '#D95F7B', '#A33050', '#6B1A30'];

const MOCK_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  brand: 'Rare Beauty',
  name: `Producto ${i + 1}`,
  price: 6.0,
  rating: 4.9,
  images: ['/product_example.png'],
  colors: i % 2 === 0 ? COLORS_A : COLORS_B,
}));

const ITEMS_PER_PAGE = 12;
const TOTAL_PAGES = 10;

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return MOCK_PRODUCTS.filter(
      (p) =>
        (!q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) &&
        (!activeBrand || p.brand === activeBrand),
    );
  }, [search, activeBrand]);

  return (
    <main className="flex flex-col flex-1 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto w-full px-6 py-10 flex flex-col gap-8">

        <h1 className="text-sm font-bold text-[#F297A0] tracking-widest uppercase">
          Explora los productos de la plataforma..
        </h1>

        <SearchWithPagination
          brands={BRANDS}
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          activeBrand={activeBrand}
          onBrandChange={(b) => { setActiveBrand(b); setPage(1); }}
          page={page}
          totalPages={TOTAL_PAGES}
          onPageChange={setPage}
        />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-2 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-gray-500 text-sm">No encontramos productos con esa búsqueda.</p>
          </div>
        )}

        <div className="flex justify-center pt-4">
          <SearchWithPagination
            brands={[]}
            value=""
            onChange={() => {}}
            activeBrand={null}
            onBrandChange={() => {}}
            page={page}
            totalPages={TOTAL_PAGES}
            onPageChange={setPage}
          />
        </div>
      </div>
    </main>
  );
}
