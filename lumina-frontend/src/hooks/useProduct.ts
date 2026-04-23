'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchProductById } from '@/infra/api/makeupApiClient';
import type { ProductFromSchema } from '@/infra/api/schemas/productSchema';

interface UseProductReturn {
  product: ProductFromSchema | null;
  formattedPrice: string;
  isLoading: boolean;
  error: string | null;
}

export function useProduct(id: number): UseProductReturn {
  const [product, setProduct] = useState<ProductFromSchema | null>(null);
  const [isLoading, setIsLoading]   = useState(true);
  const [error, setError]           = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!id || isNaN(id)) {
      setError('ID de producto inválido');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(id);
      if (!data) setError('Producto no encontrado');
      else setProduct(data);
    } catch {
      setError('Ocurrió un error al cargar el producto.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const priceNum = parseFloat(product?.price ?? '0');
  const formattedPrice =
    priceNum > 0
      ? `${product?.price_sign ?? '$'}${priceNum.toFixed(2)}`
      : '--';

  return { product, formattedPrice, isLoading, error };
}
