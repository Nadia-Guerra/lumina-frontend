import { luminaFetch } from '@/infra/api/luminaApiClient';
import type { ReviewWithUser, Review, CreateReviewPayload } from '@/domain/entities/Review';

interface ReviewListResponse {
  success: boolean;
  data: ReviewWithUser[];
}

interface ReviewCreateResponse {
  success: boolean;
  message: string;
  data: Review;
}

export async function getReviews(productId: number): Promise<ReviewWithUser[]> {
  const res = await luminaFetch<ReviewListResponse>(`/reviews/${productId}`);
  return res.data;
}
export async function createReview(
  productId: number,
  payload: CreateReviewPayload,
  token: string,
): Promise<Review> {
  const res = await luminaFetch<ReviewCreateResponse>(`/reviews/${productId}`, {
    method: 'POST',
    body: payload,
    token,
  });
  return res.data;
}
