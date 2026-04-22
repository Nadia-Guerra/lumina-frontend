'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const COLORS_A = ['#F297A0', '#E8739A', '#C0504D', '#8B2635', '#5C1A2A'];
const SHADE_NAMES = ['Mocorito', 'Milán', 'Taupe', 'Summer', 'Double Dare'];

const MOCK_PRODUCT = {
  brand: 'Rare Beauty',
  name: 'High Definition Blush',
  description: 'This Rare Beauty High Definition Blush is a high definition lightweight blush that blends evenly. This vibrant and silky blush delivers a beautiful flush of colour and is paraben free.',
  price: 6.00,
  rating: 4.9,
  image: '/product_example.png',
};

export default function ProductPage() {
  const params = useParams();
  const id = params?.id || '1'; // Usado para debug/mock si fuera necesario.
  
  const shades = COLORS_A.map((color, index) => ({
    name: SHADE_NAMES[index] || `Tono ${index + 1}`,
    color: color,
  }));

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white flex justify-center">
      <div className="max-w-5xl w-full px-6 flex flex-col md:flex-row gap-12 mt-8">
        
        {/* Left Side: Image container */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="bg-[#FDFBF2] rounded-xl p-10 flex items-center justify-center aspect-square border border-orange-50 shadow-sm relative">
            <div className="relative w-full h-full max-h-[400px]">
               <Image 
                  src={MOCK_PRODUCT.image} 
                  alt={MOCK_PRODUCT.brand}
                  fill
                  className="object-contain drop-shadow-md"
               />
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-start px-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-500">{MOCK_PRODUCT.brand}</h2>
              <p className="text-2xl font-bold text-[#A8B589] mt-2">${MOCK_PRODUCT.price.toFixed(2)}</p>
            </div>
            <button className="text-[#F297A0] hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col pt-4 md:pl-6">
          
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-500 mb-2">Descripción:</h3>
            <p className="text-gray-500 leading-relaxed">
              {MOCK_PRODUCT.description}
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-500 mb-4">Tonos:</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {shades.map((shade, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div 
                    className="w-7 h-7 rounded-full shadow-inner border border-gray-100" 
                    style={{ backgroundColor: shade.color }}
                  ></div>
                  <span className="text-gray-500 font-medium text-sm">{shade.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-500 mb-2">Reseñas</h3>
            <div className="flex items-center gap-1 mb-6">
              <span className="text-2xl font-bold text-[#F297A0]">{MOCK_PRODUCT.rating}</span>
              <span className="text-2xl text-[#F297A0]">★</span>
            </div>
            
            <Link 
              href={`/product/${id}/reviews`}
              className="text-lg font-bold text-[#F297A0] hover:text-[#E8739A] transition-colors"
            >
              Ver reseñas →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
