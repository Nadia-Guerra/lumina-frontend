import type { Product } from '@/domain/entities/Product';
import type { ProductSearchParams } from '@/domain/entities/ProductSearchParams';
import type { IProductRepository } from '@/domain/repositories/IProductRepository';
import { fetchProductById, fetchProducts } from '@/infra/api/makeupApiClient';


export class MakeupProductRepository implements IProductRepository {
  async search(params: ProductSearchParams): Promise<Product[]> {
    return fetchProducts(params as Record<string, string | number | undefined | null>);
  }

  async getById(id: number): Promise<Product | null> {
    return fetchProductById(id);
  }
}

export const productRepository = new MakeupProductRepository();
