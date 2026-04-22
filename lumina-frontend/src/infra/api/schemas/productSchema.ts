import { z } from 'zod';

/**
 * Schema Zod para un color de producto.
 * hex_value puede ser "#RRGGBB" o venir vacío en algunos productos.
 */
export const ProductColorSchema = z.object({
  hex_value: z.string().default(''),
  colour_name: z.string().default(''),
});

/**
 * Schema Zod para un producto del makeup API.
 *
 * Validaciones aplicadas:
 * - id: debe ser número entero positivo (descarta productos corruptos)
 * - name/brand: strings obligatorios no vacíos
 * - price: string o null (el API lo manda como "11.49" — no como número)
 * - rating: número entre 0 y 5, o null si no tiene reseñas
 * - image_link: URL válida (descarta productos sin imagen)
 * - tag_list: array de strings, default [] si viene null o undefined
 * - product_colors: array de colores, default [] si viene null
 * - created_at / updated_at: strings ISO, coercidos a string por si el API cambia
 */
export const ProductSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  brand: z.string().min(1),
  price: z.string().nullable().default(null),
  price_sign: z.string().nullable().default(null),
  currency: z.string().nullable().default(null),
  image_link: z.string().url(),
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
  api_featured_image: z.string().nullable().default(null),
  product_colors: z.array(ProductColorSchema).default([]),
});

/** Array de productos — lo que devuelve GET /products.json */
export const ProductListSchema = z.array(ProductSchema);

/** Tipo inferido desde el schema (compatible con la entidad Product) */
export type ProductFromSchema = z.infer<typeof ProductSchema>;
