import type { Recommendation } from '../entities/Recommendation';

export interface IRecommendationRepository {
  getByProductId(productId: number): Promise<Recommendation>;
}
