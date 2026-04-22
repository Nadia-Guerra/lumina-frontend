import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/infra/api/makeupApiClient';

/**
 * Server Component — fetch en build/revalidación, no en el cliente.
 * Muestra una vitrina fija de productos de la landing sin filtros.
 */
export default async function ProductsSection() {
  let products: Awaited<ReturnType<typeof fetchProducts>> = [];

  try {
    // Traemos lipsticks de revlon como vitrina representativa (8 productos)
    products = await fetchProducts({ product_type: 'lipstick', brand: 'revlon' });
    products = products.slice(0, 8);
  } catch {
    // Si la API falla en build, la vitrina queda vacía sin romper la landing
    products = [];
  }

  return (
    <section id="productos" className="w-full bg-white py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold text-[#F297A0] mb-6">Productos</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
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
        ) : (
          <p className="text-sm text-gray-400 text-center py-10">
            No se pudieron cargar los productos de muestra.
          </p>
        )}
      </div>
    </section>
  );
}
