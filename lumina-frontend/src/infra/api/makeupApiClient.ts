import { z } from 'zod';
import { ProductListSchema, ProductSchema } from './schemas/productSchema';
import { luminaFetch, LuminaApiError } from './luminaApiClient';

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
  const finalParams = { limit: 100, ...params };
  
  const hasFilters = Object.keys(finalParams).some(k => k !== 'page' && k !== 'limit');
  const endpoint = hasFilters ? '/products/search' : '/products';
  
  const res = await luminaFetch<{ success: boolean; data: { products: unknown[] } }>(
    `${endpoint}${buildQuery(finalParams)}`
  );

  const raw = res.data.products;

  const result = ProductListSchema.safeParse(raw);
  if (!result.success) {
    console.warn('[Lumina API] Algunos productos fallaron la validación:', result.error.flatten());
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
  try {
    // Reemplazado a luminaFetch
    const res = await luminaFetch<{ success: boolean; data: unknown }>(`/products/${id}`);
    const raw = res.data;

    const result = ProductSchema.safeParse(raw);

    if (!result.success) {
      console.warn(`[Lumina API] Producto ${id} inválido:`, result.error.flatten());
      return null;
    }

    return result.data;
  } catch (error: unknown) {
    if (error instanceof LuminaApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}
