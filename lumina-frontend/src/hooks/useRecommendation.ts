'use client';

import { useState, useCallback } from 'react';
import { getRecommendation } from '@/infra/repositories/RecommendationRepository';
import type { Recommendation } from '@/domain/entities/Recommendation';
import { LuminaApiError } from '@/infra/api/luminaApiClient';

interface UseRecommendationReturn {
  recommendation: Recommendation | null;
  isLoading: boolean;
  error: string | null;
  fetchRecommendation: (id: number) => Promise<void>;
}

export function useRecommendation(): UseRecommendationReturn {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading]           = useState(false);
  const [error, setError]                   = useState<string | null>(null);

  const fetchRecommendation = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRecommendation(id);
      setRecommendation(data);
    } catch (err) {
      if (err instanceof LuminaApiError && err.status === 404) {
        setError('Recomendación no encontrada.');
      } else {
        setError('Error al cargar la recomendación.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { recommendation, isLoading, error, fetchRecommendation };
}
