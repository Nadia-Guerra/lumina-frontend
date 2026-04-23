'use client';

import { useState, useEffect, useCallback } from 'react';
import { addFavourite } from '@/infra/repositories/FavouriteRepository';
import { LuminaApiError } from '@/infra/api/luminaApiClient';
import { useAuth } from '@/context/AuthContext';

const FAVORITES_KEY = 'lumina_favorites';

export function useFavorites() {
  const { token, isAuthenticated } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded]       = useState(false);

  // Carga IDs locales al montar (caché optimista)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) setFavoriteIds(JSON.parse(stored));
    } catch (e) {
      console.error('Failed to load favorites from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sincroniza tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY && e.newValue) {
        setFavoriteIds(JSON.parse(e.newValue));
      }
    };
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<number[]>;
      setFavoriteIds(customEvent.detail);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('lumina_favorites_changed', handleCustomEvent);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('lumina_favorites_changed', handleCustomEvent);
    };
  }, []);

  /** Persiste IDs localmente y notifica a otros componentes */
  const persistLocal = useCallback((ids: number[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
      window.dispatchEvent(
        new CustomEvent('lumina_favorites_changed', { detail: ids }),
      );
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, []);

  /**
   * Agrega un producto a favoritos.
   * - Si hay sesión: llama al backend (persistencia real).
   * - Si no hay sesión: solo guarda en localStorage (caché local).
   * @returns `'added'` | `'already_exists'` | `'error'`
   */
  const addToFavorites = useCallback(
    async (
      id: number,
      meta?: { name?: string; imgUrl?: string },
    ): Promise<'added' | 'already_exists' | 'error'> => {
      if (favoriteIds.includes(id)) return 'already_exists';

      const newIds = [...favoriteIds, id];

      // Update optimista local inmediato
      setFavoriteIds(newIds);
      persistLocal(newIds);

      if (isAuthenticated && token) {
        try {
          await addFavourite(
            { externalId: id, name: meta?.name, imgUrl: meta?.imgUrl },
            token,
          );
        } catch (err) {
          if (err instanceof LuminaApiError && err.status === 409) {
            // Ya existe en backend — está bien, el estado local ya lo refleja
            return 'already_exists';
          }
          // Revertir si hay error real
          const reverted = newIds.filter((fid) => fid !== id);
          setFavoriteIds(reverted);
          persistLocal(reverted);
          return 'error';
        }
      }

      return 'added';
    },
    [favoriteIds, isAuthenticated, token, persistLocal],
  );

  /** Elimina del listado local (el backend no tiene DELETE en la doc actual) */
  const removeFromFavorites = useCallback(
    (id: number) => {
      const newIds = favoriteIds.filter((fid) => fid !== id);
      setFavoriteIds(newIds);
      persistLocal(newIds);
    },
    [favoriteIds, persistLocal],
  );

  /** Toggle: agrega o elimina */
  const toggleFavorite = useCallback(
    async (id: number, meta?: { name?: string; imgUrl?: string }) => {
      if (favoriteIds.includes(id)) {
        removeFromFavorites(id);
      } else {
        await addToFavorites(id, meta);
      }
    },
    [favoriteIds, addToFavorites, removeFromFavorites],
  );

  const isFavorite = useCallback(
    (id: number) => favoriteIds.includes(id),
    [favoriteIds],
  );

  return {
    favoriteIds,
    isLoaded,
    toggleFavorite,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
}
