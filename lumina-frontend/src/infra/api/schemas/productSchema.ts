import { z } from 'zod';

export const ProductColorSchema = z.object({
  hex_value: z.string().default(''),
  colour_name: z.string().default(''),
});

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  brand: z.string().min(1),
  price: z.string().nullable().default(null),
  price_sign: z.string().nullable().default(null),
  currency: z.string().nullable().default(null),
  image_link: z
    .string()
    .transform((v) => (v.startsWith('//') ? `https:${v}` : v))
    .pipe(z.string().url())
    .catch('/product_example.png'), // fallback si la URL sigue siendo inválida
  product_link: z.string().nullable().default(null),
  website_link: z.string().nullable().default(null),
  description: z.string().nullable().default(null),
  rating: z.number().min(0).max(5).nullable().default(null),
  category: z.string().nullable().default(null),
  product_type: z.string().nullable().default(null),
  tag_list: z.array(z.string()).default([]),
  created_at: z.string().default(''),
  updated_at: z.string().default(''),
  product_api_url: z.string().nullable().default(null),
  api_featured_image: z
    .string()
    .transform((v) => (v.startsWith('//') ? `https:${v}` : v))
    .nullable()
    .default(null),
  product_colors: z.array(ProductColorSchema).default([]),
});

export const ProductListSchema = z.array(ProductSchema);

export type ProductFromSchema = z.infer<typeof ProductSchema>;
