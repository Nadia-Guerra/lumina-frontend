import type { Product } from '../entities/Product';
import type { ProductSearchParams } from '../entities/ProductSearchParams';

export interface IProductRepository {
  search(params: ProductSearchParams): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
}
