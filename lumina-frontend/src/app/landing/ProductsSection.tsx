// Mock de productos - reemplazar con API real cuando esté disponible
const MOCK_PRODUCTS = [
  { id: 1,  brand: 'Rare Beauty', name: 'Soft Pinch Lip Oil',       price: 6.00, rating: 4.9 },
  { id: 2,  brand: 'Rare Beauty', name: 'Perfect Strokes Liner',    price: 6.00, rating: 4.9 },
  { id: 3,  brand: 'Rare Beauty', name: 'Positive Light Serum',     price: 6.00, rating: 4.9 },
  { id: 4,  brand: 'Rare Beauty', name: 'Always An Optimist Blush', price: 6.00, rating: 4.9 },
  { id: 5,  brand: 'Rare Beauty', name: 'Kind Words Lip Liner',     price: 6.00, rating: 4.9 },
  { id: 6,  brand: 'Rare Beauty', name: 'Warm Wishes Blush',        price: 6.00, rating: 4.9 },
  { id: 7,  brand: 'Rare Beauty', name: 'Find Comfort Body Lotion', price: 6.00, rating: 4.9 },
  { id: 8,  brand: 'Rare Beauty', name: 'With Gratitude Deodorant', price: 6.00, rating: 4.9 },
];

function ProductCard({ brand, name, price, rating }: {
  brand: string; name: string; price: number; rating: number;
}) {
  return (
    <article className="bg-[#F5EFE6] rounded-2xl overflow-hidden p-3 flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="w-full aspect-square bg-[#E8D5B5] rounded-xl flex items-center justify-center overflow-hidden">
        <span className="text-xs text-[#B8934A] font-medium text-center px-2 leading-tight">
          {name}
        </span>
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        <p className="text-xs font-semibold text-gray-700">{brand}</p>
        <p className="text-sm font-bold text-[#E8739A]">${price.toFixed(2)}</p>
        <p className="text-xs text-gray-400">
          {rating} <span className="text-yellow-400">★</span>
        </p>
      </div>
    </article>
  );
}

export default function ProductsSection() {
  return (
    <section id="productos" className="w-full bg-white py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-[#E8739A] mb-6">Productos</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
