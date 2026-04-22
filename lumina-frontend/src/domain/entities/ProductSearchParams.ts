import type { ProductBrand, ProductTag, ProductType } from './Product';
export interface ProductSearchParams {
  product_type?: ProductType;
  product_category?: string;
  product_tags?: ProductTag | string;
  brand?: ProductBrand | string;
}
