'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isReviewModalOpen: boolean;
  openReviewModal: () => void;
  closeReviewModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        isReviewModalOpen,
        openReviewModal: () => setIsReviewModalOpen(true),
        closeReviewModal: () => setIsReviewModalOpen(false),
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
