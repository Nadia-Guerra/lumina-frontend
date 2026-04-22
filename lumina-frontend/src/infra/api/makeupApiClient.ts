import { z } from 'zod';
import { ProductListSchema, ProductSchema } from './schemas/productSchema';

/**
 * URL base del makeup API.
 * Cambia NEXT_PUBLIC_MAKEUP_API_URL en .env.local para apuntar a otro servidor
 * sin tocar código.
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_MAKEUP_API_URL ??
  'https://makeup-api.herokuapp.com/api/v1';

/**
 * Convierte un objeto de parámetros en una query string,
 * omitiendo valores undefined, null o string vacío.
 */
function buildQuery(params: Record<string, string | number | undefined | null>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ''
  );
  if (!entries.length) return '';
  return '?' + entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
}

/**
 * Busca productos aplicando los filtros dados.
 * GET /products.json?brand=...&product_type=...&...
 */
export async function fetchProducts(
  params: Record<string, string | number | undefined | null> = {}
): Promise<z.infer<typeof ProductListSchema>> {
  const url = `${BASE_URL}/products.json${buildQuery(params)}`;
  const res = await fetch(url, { next: { revalidate: 60 * 10 } }); // cache 10 min

  if (!res.ok) {
    throw new Error(`Error al obtener productos: ${res.status} ${res.statusText}`);
  }

  const raw = await res.json();

  // Zod parsea y valida. safeParse para no romper la app si un producto tiene
  // datos corruptos — los filtra en lugar de tirar un crash.
  const result = ProductListSchema.safeParse(raw);
  if (!result.success) {
    console.warn('[makeup API] Algunos productos fallaron la validación:', result.error.flatten());
    // Intento rescatar los productos válidos uno por uno
    if (Array.isArray(raw)) {
      return raw.flatMap((item) => {
        const r = ProductSchema.safeParse(item);
        return r.success ? [r.data] : [];
      });
    }
    return [];
  }

  return result.data;
}

/**
 * Obtiene un producto por ID.
 * GET /products/{id}.json
 */
export async function fetchProductById(
  id: number
): Promise<z.infer<typeof ProductSchema> | null> {
  const url = `${BASE_URL}/products/${id}.json`;
  const res = await fetch(url, { next: { revalidate: 60 * 10 } });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Error al obtener producto ${id}: ${res.status}`);
  }

  const raw = await res.json();
  const result = ProductSchema.safeParse(raw);

  if (!result.success) {
    console.warn(`[makeup API] Producto ${id} inválido:`, result.error.flatten());
    return null;
  }

  return result.data;
}
