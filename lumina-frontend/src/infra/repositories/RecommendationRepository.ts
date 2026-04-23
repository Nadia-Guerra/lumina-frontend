import { luminaFetch } from '@/infra/api/luminaApiClient';
import type { Recommendation } from '@/domain/entities/Recommendation';

interface RecommendationResponse {
  success: boolean;
  data: Recommendation;
}

export async function getRecommendation(
  id: number,
): Promise<Recommendation> {
  const res = await luminaFetch<RecommendationResponse>(`/recommendations/${id}`);
  return res.data;
}
