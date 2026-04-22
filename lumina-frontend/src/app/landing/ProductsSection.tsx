import ProductCard from '@/components/ProductCard';

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

export default function ProductsSection() {
  return (
    <section id="productos" className="w-full bg-white py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-[#F297A0] mb-6">Productos</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {MOCK_PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              brand={p.brand}
              name={p.name}
              price={p.price}
              rating={p.rating}
              images={['/product_example.png']}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
