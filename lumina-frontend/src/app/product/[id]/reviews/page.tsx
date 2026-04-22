'use client';

import { useModal } from '@/app/share/modals/ModalContext';

const MOCK_REVIEWS = [
  { 
    id: 1, 
    user: 'naddiluv', 
    rating: 2, 
    shade: { name: 'Taupe', color: '#8B2635' }, 
    text: 'lo odio está horrible q asco' 
  },
  { 
    id: 2, 
    user: 'xolcht', 
    rating: 4, 
    shade: { name: 'Taupe', color: '#8B2635' }, 
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' 
  },
  { 
    id: 3, 
    user: 'ao_j05', 
    rating: 4, 
    shade: { name: 'Taupe', color: '#8B2635' }, 
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' 
  },
];

export default function ReviewsPage() {
  const { openReviewModal } = useModal();

  return (
    <div className="min-h-screen pt-12 pb-24 bg-white flex justify-center">
      <div className="max-w-4xl w-full px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-gray-500 font-medium mb-2">Promedio:</p>
            <div className="flex items-center gap-1">
              <span className="text-5xl font-bold text-[#F297A0]">4.82</span>
              <span className="text-5xl text-[#F297A0]">★</span>
            </div>
          </div>
          <button 
            onClick={openReviewModal}
            className="text-lg font-semibold text-[#F297A0] hover:text-[#E8739A] transition-colors mb-2"
          >
            Escribir una reseña →
          </button>
        </div>

        {/* Reviews List */}
        <div className="flex flex-col gap-6">
          {MOCK_REVIEWS.map((review) => (
            <div key={review.id} className="border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-500 font-medium mb-1">{review.user}</p>
              
              {/* Stars */}
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
              </div>

              {/* Shade */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-500 text-sm">Tono:</span>
                <div 
                  className="w-5 h-5 rounded-full shadow-inner" 
                  style={{ backgroundColor: review.shade.color }}
                ></div>
                <span className="text-gray-500 text-sm">{review.shade.name}</span>
              </div>

              {/* Text */}
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                {review.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
