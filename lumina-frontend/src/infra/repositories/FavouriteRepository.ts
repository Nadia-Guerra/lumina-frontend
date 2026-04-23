import { luminaFetch } from '@/infra/api/luminaApiClient';
import type { Favourite, AddFavouritePayload } from '@/domain/entities/Favourite';

interface FavouriteResponse {
  success: boolean;
  data: Favourite;
}

export async function addFavourite(
  payload: AddFavouritePayload,
  token: string,
): Promise<Favourite> {
  const res = await luminaFetch<FavouriteResponse>('/favourites', {
    method: 'POST',
    body: payload,
    token,
  });
  return res.data;
}
