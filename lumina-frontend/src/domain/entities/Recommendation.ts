import type { LuminaProduct } from './Product';

export interface Recommendation {
  product: LuminaProduct;
  recommendation: string;
}
