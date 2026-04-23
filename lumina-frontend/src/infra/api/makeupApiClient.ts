import { z } from 'zod';
import { ProductListSchema, ProductSchema } from './schemas/productSchema';

const BASE_URL =
  process.env.NEXT_PUBLIC_LUMINA_API_URL 

function buildQuery(params: Record<string, string | number | undefined | null>): string {
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ''
  );
  if (!entries.length) return '';
  return '?' + entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&');
}

export async function fetchProducts(
  params: Record<string, string | number | undefined | null> = {}
): Promise<z.infer<typeof ProductListSchema>> {
  const url = `${BASE_URL}/products.json${buildQuery(params)}`;
  const res = await fetch(url, { next: { revalidate: 60 * 10 } }); // cache 10 min

  if (!res.ok) {
    throw new Error(`Error al obtener productos: ${res.status} ${res.statusText}`);
  }

  const raw = await res.json();

  const result = ProductListSchema.safeParse(raw);
  if (!result.success) {
    console.warn('[makeup API] Algunos productos fallaron la validación:', result.error.flatten());
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
