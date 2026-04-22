import type { Product } from '@/domain/entities/Product';
import type { ProductSearchParams } from '@/domain/entities/ProductSearchParams';
import type { IProductRepository } from '@/domain/repositories/IProductRepository';
import { fetchProductById, fetchProducts } from '@/infra/api/makeupApiClient';

/**
 * Implementación del repositorio de productos usando el makeup API.
 * Cuando el backend de Lumina esté listo, se crea otra clase que
 * implemente IProductRepository apuntando a la nueva URL — sin tocar
 * las páginas ni los componentes.
 */
export class MakeupProductRepository implements IProductRepository {
  async search(params: ProductSearchParams): Promise<Product[]> {
    return fetchProducts(params as Record<string, string | number | undefined | null>);
  }

  async getById(id: number): Promise<Product | null> {
    return fetchProductById(id);
  }
}

/** Singleton listo para usar en Server Components y hooks */
export const productRepository = new MakeupProductRepository();
