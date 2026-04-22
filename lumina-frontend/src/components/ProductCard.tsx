'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface ProductCardProps {
  id?: number;
  brand: string;
  name: string;
  /** Acepta number (mock), string (makeup API: "11.49") o null */
  price: number | string | null;
  /** Acepta number (rating) o null si el producto no tiene reseñas aún */
  rating: number | null;
  images?: string[];
  colors?: string[];
  defaultLiked?: boolean;
  onLikeChange?: (liked: boolean) => void;
}

const DEFAULT_COLORS = ['#F297A0', '#E8739A', '#C0504D', '#8B2635', '#5C1A2A'];

export default function ProductCard({
  id = 1,
  brand,
  name,
  price,
  rating,
  images = ['/product_example.png'],
  colors = DEFAULT_COLORS,
  defaultLiked = false,
  onLikeChange,
}: ProductCardProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(defaultLiked);
  const [activeColor, setActiveColor] = useState(0);
  const router = useRouter();

  const prev = () => setActiveImg((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveImg((i) => (i + 1) % images.length);

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <article 
      onClick={handleCardClick}
      className="bg-[#FFF8F5] rounded-2xl overflow-hidden flex flex-col gap-0 hover:shadow-md transition-shadow cursor-pointer group select-none"
    >
      {/* Image carousel */}
      <div className="relative w-full aspect-square bg-[#FFF0EA] overflow-hidden">
        {/* Carousel image */}
        <div className="w-full h-full flex items-center justify-center p-4">
          <Image
            src={images[activeImg]}
            alt={name}
            fill
            className="object-contain p-4 transition-opacity duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        {/* Arrows – only visible when >1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-6 h-6 flex items-center justify-center shadow text-gray-500 text-xs transition-all opacity-0 group-hover:opacity-100"
              aria-label="Imagen anterior"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-6 h-6 flex items-center justify-center shadow text-gray-500 text-xs transition-all opacity-0 group-hover:opacity-100"
              aria-label="Imagen siguiente"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 px-3 pt-2.5 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">{name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const next = !liked;
              setLiked(next);
              onLikeChange?.(next);
            }}
            className={`text-2xl leading-none transition-transform active:scale-75 ${liked ? 'text-[#F297A0]' : 'text-[#F297A0]/40'}`}
            aria-label={liked ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {liked ? '♥' : '♡'}
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {colors.map((c, i) => (
            <button
              key={`${i}-${c}`}
              onClick={(e) => { e.stopPropagation(); setActiveColor(i); }}
              style={{ backgroundColor: c }}
              className={`w-4 h-4 rounded-full transition-all ${
                activeColor === i ? 'ring-2 ring-offset-1 ring-[#F297A0] scale-110' : 'opacity-80 hover:opacity-100'
              }`}
              aria-label={`Color ${i + 1}`}
            />
          ))}
        </div>

        <p className="text-base font-bold text-[#F297A0] leading-tight">
          {price != null ? `$${parseFloat(String(price)).toFixed(2)}` : '—'}
        </p>

        <p className="text-xs text-gray-400 leading-tight">
          {rating != null ? <>{rating} <span className="text-yellow-400">★</span></> : '—'}
        </p>
      </div>
    </article>
  );
}
