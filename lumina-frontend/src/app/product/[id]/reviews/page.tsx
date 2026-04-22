'use client';

import { use, useEffect } from 'react';
import { useModal } from '@/app/share/modals/ModalContext';
import { useReviews } from '@/hooks/useReviews';

interface Props {
  params: Promise<{ id: string }>;
}

export default function ReviewsPage({ params }: Props) {
  const { id } = use(params);
  const productId = Number(id);
  const { openReviewModal } = useModal();
  const { reviews, average, isLoading, error, fetchReviews } = useReviews();

  useEffect(() => {
    if (!isNaN(productId)) fetchReviews(productId);
  }, [productId, fetchReviews]);

  return (
    <div className="min-h-screen pt-12 pb-24 bg-white flex justify-center">
      <div className="max-w-4xl w-full px-6">

        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-gray-500 font-medium mb-2">Promedio:</p>
            <div className="flex items-center gap-1">
              {isLoading ? (
                <div className="h-12 w-24 bg-gray-100 rounded animate-pulse" />
              ) : average ? (
                <>
                  <span className="text-5xl font-bold text-[#F297A0]">{average}</span>
                  <span className="text-5xl text-[#F297A0]">★</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-300">Sin reseñas</span>
              )}
            </div>
          </div>
          <button
            onClick={() => openReviewModal(productId)}
            className="text-lg font-semibold text-[#F297A0] hover:text-[#E8739A] transition-colors mb-2"
          >
            Escribir una reseña →
          </button>
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-3 w-24 bg-gray-100 rounded mb-3" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-5 h-5 bg-gray-100 rounded" />
                  ))}
                </div>
                <div className="h-3 bg-gray-100 rounded mb-2" />
                <div className="h-3 w-3/4 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="py-12 text-center text-red-400 text-sm">{error}</div>
        )}

        {!isLoading && !error && (
          <div className="flex flex-col gap-6">
            {reviews.length === 0 ? (
              <div className="flex flex-col items-center py-24 gap-3 text-center">
                <span className="text-5xl">💬</span>
                <p className="text-gray-400 text-sm">Sé el primero en dejar una reseña.</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <p className="text-gray-500 font-medium mb-1">{review.user.username}</p>
                  <div className="flex items-center gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-5 h-5 ${star <= review.rating ? 'text-[#F297A0]' : 'text-gray-200'}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-400">{review.rating}/5</span>
                  </div>
                  {review.content && (
                    <p className="text-gray-500 leading-relaxed text-sm md:text-base">{review.content}</p>
                  )}
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
