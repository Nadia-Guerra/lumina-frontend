'use client';

import { useModal } from './ModalContext';
import { useState, useEffect } from 'react';

const COLORS_A = ['#F297A0', '#E8739A', '#C0504D', '#8B2635', '#5C1A2A'];
const SHADE_NAMES = ['Mocorito', 'Milán', 'Taupe', 'Summer', 'Double Dare'];

export default function ReviewModal() {
  const { isReviewModalOpen, closeReviewModal } = useModal();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedShade, setSelectedShade] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeReviewModal();
        setError('');
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeReviewModal]);

  if (!isReviewModalOpen) return null;

  const currentRating = hoverRating || rating;

  const handleSave = () => {
    if (!reviewText.trim()) {
      setError('Por favor, escribe una reseña antes de guardar.');
      return;
    }
    console.log("Saving review...", { rating, reviewText, selectedShade });
    closeReviewModal();
    setReviewText('');
    setRating(0);
    setError('');
    // In the future: post to API
  };

  const handleCancel = () => {
    closeReviewModal();
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full max-w-2xl p-8 border border-gray-100 relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reseña:</h2>

        <div className="flex flex-col md:flex-row gap-8 mb-6">
          {/* Star Rating */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-500">Puntuación:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFull = currentRating >= star;
                const isHalf = currentRating >= star - 0.5 && currentRating < star;
                
                return (
                  <div key={star} className="relative w-8 h-8 cursor-pointer">
                    <div 
                      className="absolute left-0 top-0 w-1/2 h-full z-20"
                      onMouseEnter={() => setHoverRating(star - 0.5)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star - 0.5)}
                    />
                    <div 
                      className="absolute right-0 top-0 w-1/2 h-full z-20"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    />
                    
                    {/* Background star (gray) */}
                    <svg className="w-8 h-8 text-gray-200 absolute top-0 left-0 z-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>

                    {/* Foreground star (pink) with clip-path */}
                    <svg 
                      className="w-8 h-8 text-[#F297A0] absolute top-0 left-0 z-10 transition-all duration-150" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ 
                        clipPath: isFull ? 'inset(0 0 0 0)' : isHalf ? 'inset(0 50% 0 0)' : 'inset(0 100% 0 0)' 
                      }}
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                );
              })}
              <span className="ml-2 text-[#F297A0] font-semibold">{currentRating > 0 ? currentRating : ''}</span>
            </div>
          </div>

          {/* Shade Selection */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-500">Tono (opcional):</span>
            <div className="flex items-center gap-2">
              {COLORS_A.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedShade(index)}
                  className={`w-7 h-7 rounded-full shadow-inner border border-gray-100 transition-all ${selectedShade === index ? 'ring-2 ring-offset-2 ring-[#F297A0] scale-110' : 'hover:scale-110'}`}
                  style={{ backgroundColor: color }}
                  title={SHADE_NAMES[index]}
                />
              ))}
            </div>
          </div>
        </div>

        <textarea
          value={reviewText}
          onChange={(e) => {
            setReviewText(e.target.value);
            if (error) setError('');
          }}
          placeholder="Escribe tu reseña"
          className={`w-full h-40 p-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#F297A0]/50 transition-colors text-gray-600 mb-2 ${error ? 'border-red-400 focus:border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-[#F297A0]'}`}
        ></textarea>
        
        {/* Espacio para el error para que no mueva los botones de forma brusca */}
        <div className="h-6 mb-4">
          {error && <p className="text-red-500 text-sm font-medium pl-1">{error}</p>}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-8 py-2.5 bg-[#FBBFC7] hover:bg-[#F297A0] text-white font-semibold rounded-full transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2.5 bg-[#F297A0] hover:bg-[#E8739A] text-white font-semibold rounded-full transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
