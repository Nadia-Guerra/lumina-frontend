'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'lumina_favorites';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavoriteIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load favorites from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Listen to storage events to keep tabs in sync, or custom event for same-tab updates
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

  const toggleFavorite = useCallback((id: number) => {
    const newFavorites = favoriteIds.includes(id) 
      ? favoriteIds.filter((favId) => favId !== id)
      : [...favoriteIds, id];
      
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      // Dispatch custom event for other components in the same tab
      window.dispatchEvent(
        new CustomEvent('lumina_favorites_changed', { detail: newFavorites })
      );
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favoriteIds]);

  const isFavorite = useCallback((id: number) => {
    return favoriteIds.includes(id);
  }, [favoriteIds]);

  return {
    favoriteIds,
    isLoaded,
    toggleFavorite,
    isFavorite,
  };
}
