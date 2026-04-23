'use client';

import { useState, useCallback } from 'react';
import { getReviews, createReview } from '@/infra/repositories/ReviewRepository';
import type { ReviewWithUser } from '@/domain/entities/Review';
import { useAuth } from '@/context/AuthContext';
import { LuminaApiError } from '@/infra/api/luminaApiClient';

interface UseReviewsReturn {
  reviews: ReviewWithUser[];
  average: string | null;
  isLoading: boolean;
  error: string | null;
  fetchReviews: (productId: number) => Promise<void>;
  submitReview: (productId: number, rating: number, content?: string) => Promise<void>;
  isSubmitting: boolean;
  submitError: string | null;
}

export function useReviews(): UseReviewsReturn {
  const { token, isAuthenticated } = useAuth();
  const [reviews, setReviews]           = useState<ReviewWithUser[]>([]);
  const [isLoading, setIsLoading]       = useState(false);
  const [error, setError]               = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);

  const fetchReviews = useCallback(async (productId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getReviews(productId);
      setReviews(data);
    } catch (err) {
      const msg = err instanceof LuminaApiError ? err.message : 'Error al cargar reseñas';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitReview = useCallback(
    async (productId: number, rating: number, content?: string) => {
      if (!isAuthenticated || !token) {
        setSubmitError('Debes iniciar sesión para dejar una reseña.');
        return;
      }
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const newReview = await createReview(productId, { rating, content }, token);
        // Optimistic update: agrega la nueva reseña al listado local
        const provisional: ReviewWithUser = {
          ...newReview,
          user: { username: 'Tú' },
        };
        setReviews((prev) => [provisional, ...prev]);
      } catch (err) {
        if (err instanceof LuminaApiError) {
          if (err.status === 401) setSubmitError('Debes iniciar sesión para reseñar.');
          else if (err.status === 409) setSubmitError('Ya dejaste una reseña para este producto.');
          else setSubmitError(err.message);
        } else {
          setSubmitError('Error al guardar la reseña.');
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [isAuthenticated, token],
  );

  const average =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  return { reviews, average, isLoading, error, fetchReviews, submitReview, isSubmitting, submitError };
}
