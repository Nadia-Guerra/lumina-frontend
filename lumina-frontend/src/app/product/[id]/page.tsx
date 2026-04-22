'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProductById } from '@/infra/api/makeupApiClient';
import type { ProductFromSchema } from '@/infra/api/schemas/productSchema';
import { useFavorites } from '@/hooks/useFavorites';

export default function ProductPage() {
  const params = useParams();
  const idStr = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const id = parseInt(idStr || '0', 10);

  const [product, setProduct] = useState<ProductFromSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(id);

  useEffect(() => {
    if (!id) {
      setError('ID de producto inválido');
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        if (!data) {
          setError('Producto no encontrado');
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error(err);
        setError('Ocurrió un error al cargar el producto.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-white flex justify-center items-center">
        <span className="text-[#F297A0] text-xl animate-pulse">Cargando producto...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-white flex flex-col justify-center items-center gap-4">
        <span className="text-4xl">⚠️</span>
        <h2 className="text-xl text-gray-600">{error || 'Producto no encontrado'}</h2>
        <Link href="/home" className="px-5 py-2 bg-[#F297A0] hover:bg-[#E8739A] text-white rounded-full transition-colors mt-4">
          Volver a inicio
        </Link>
      </div>
    );
  }

  const priceNum = parseFloat(product.price || '0');

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white flex justify-center">
      <div className="max-w-5xl w-full px-6 flex flex-col md:flex-row gap-12 mt-8">
        
        {/* Left Side: Image container */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="bg-[#FDFBF2] rounded-xl p-10 flex items-center justify-center aspect-square border border-orange-50 shadow-sm relative">
            <div className="relative w-full h-full max-h-[400px]">
               <Image 
                  src={product.image_link || '/product_example.png'} 
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-md"
               />
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-start px-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-500">{product.brand}</h2>
              <p className="text-2xl font-bold text-[#A8B589] mt-2">
                {product.price_sign || '$'}{priceNum > 0 ? priceNum.toFixed(2) : '--'}
              </p>
            </div>
            <button 
              onClick={() => toggleFavorite(id)}
              className={`text-2xl leading-none transition-transform active:scale-75 ${liked ? 'text-[#F297A0]' : 'text-[#F297A0]/40'}`}
            >
              {liked ? '♥' : '♡'}
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col pt-4 md:pl-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-500 text-sm uppercase tracking-wider">{product.category || product.product_type}</p>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-500 mb-2">Descripción:</h3>
            <p className="text-gray-500 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: product.description || 'Sin descripción disponible.' }} />
          </div>

          {product.product_colors && product.product_colors.length > 0 && (
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-500 mb-4">Tonos:</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-4">
                {product.product_colors.map((shade, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div 
                      className="w-7 h-7 rounded-full shadow-inner border border-gray-200" 
                      style={{ backgroundColor: shade.hex_value }}
                      title={shade.colour_name || `Color ${idx + 1}`}
                    ></div>
                    <span className="text-gray-500 font-medium text-sm truncate max-w-[100px]" title={shade.colour_name}>
                      {shade.colour_name || `Color ${idx + 1}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-500 mb-2">Reseñas</h3>
            <div className="flex items-center gap-1 mb-6">
              <span className="text-2xl font-bold text-[#F297A0]">{product.rating || '4.9'}</span>
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
