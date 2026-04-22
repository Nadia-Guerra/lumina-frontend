/**
 * Representa un color disponible para un producto de maquillaje.
 */
export interface ProductColor {
  hex_value: string;
  colour_name: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;

  price: string | null;

  price_sign: string | null;

  currency: string | null;
  image_link: string;

  product_link: string | null;

  website_link: string | null;
  description: string | null;
  rating: number | null;
  category: string | null;
  product_type: string | null;

  tag_list: string[];

  created_at: string;
  updated_at: string;
  product_api_url: string | null;

  api_featured_image: string | null;
  product_colors: ProductColor[];
}

export type LuminaProduct = Pick<
  Product,
  'id' | 'name' | 'brand' | 'category' | 'image_link'
>;


export const PRODUCT_TYPES = [
  'blush',
  'bronzer',
  'eyebrow',
  'eyeliner',
  'eyeshadow',
  'foundation',
  'lip_liner',
  'lipstick',
  'mascara',
  'nail_polish',
] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

export const PRODUCT_TAGS = [
  'Canadian',
  'CertClean',
  'Chemical Free',
  'Dairy Free',
  'EWG Verified',
  'EcoCert',
  'Fair Trade',
  'Gluten Free',
  'Hypoallergenic',
  'Natural',
  'No Talc',
  'Non-GMO',
  'Organic',
  'Peanut Free Product',
  'Sugar Free',
  'USDA Organic',
  'Vegan',
  'alcohol free',
  'cruelty free',
  'oil free',
  'purpicks',
  'silicone free',
  'water free',
] as const;

export type ProductTag = (typeof PRODUCT_TAGS)[number];

export const PRODUCT_BRANDS = [
  'almay',
  'alva',
  'anna sui',
  'annabelle',
  'benefit',
  'boosh',
  "burt's bees",
  'butter london',
  "c'est moi",
  'cargo cosmetics',
  'china glaze',
  'clinique',
  'coastal classic creation',
  'colourpop',
  'covergirl',
  'dalish',
  'deciem',
  'dior',
  'dr. hauschka',
  'e.l.f.',
  'essie',
  'fenty',
  'glossier',
  'green people',
  'iman',
  "l'oreal",
  'lotus cosmetics usa',
  "maia's mineral galaxy",
  'marcelle',
  'marienatie',
  'maybelline',
  'milani',
  'mineral fusion',
  'misa',
  'mistura',
  'moov',
  'nudus',
  'nyx',
  'orly',
  'pacifica',
  'penny lane organics',
  'physicians formula',
  'piggy paint',
  'pure anada',
  'rejuva minerals',
  'revlon',
  "sally b's skin yummies",
  'salon perfect',
  'sante',
  'sinful colours',
  'smashbox',
  'stila',
  'suncoat',
  'w3llpeople',
  'wet n wild',
  'zorah',
  'zorah biocosmetiques',
] as const;

export type ProductBrand = (typeof PRODUCT_BRANDS)[number];
