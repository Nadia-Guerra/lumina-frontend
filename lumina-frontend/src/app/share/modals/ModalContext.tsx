'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;

  isReviewModalOpen: boolean;
  reviewProductId: number | null;
  openReviewModal: (productId: number) => void;
  closeReviewModal: () => void;

  isProfileModalOpen: boolean;
  openProfileModal: () => void;
  closeProfileModal: () => void;

  isRecommendationModalOpen: boolean;
  recommendationId: number | null;
  openRecommendationModal: (id: number) => void;
  closeRecommendationModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen]           = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen]         = useState(false);
  const [reviewProductId, setReviewProductId]             = useState<number | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen]       = useState(false);
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);
  const [recommendationId, setRecommendationId]           = useState<number | null>(null);

  return (
    <ModalContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal:  () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),

        isReviewModalOpen,
        reviewProductId,
        openReviewModal: (productId) => {
          setReviewProductId(productId);
          setIsReviewModalOpen(true);
        },
        closeReviewModal: () => {
          setIsReviewModalOpen(false);
          setReviewProductId(null);
        },

        isProfileModalOpen,
        openProfileModal:  () => setIsProfileModalOpen(true),
        closeProfileModal: () => setIsProfileModalOpen(false),

        isRecommendationModalOpen,
        recommendationId,
        openRecommendationModal: (id) => {
          setRecommendationId(id);
          setIsRecommendationModalOpen(true);
        },
        closeRecommendationModal: () => {
          setIsRecommendationModalOpen(false);
          setRecommendationId(null);
        },
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal debe usarse dentro de ModalProvider');
  return context;
}
