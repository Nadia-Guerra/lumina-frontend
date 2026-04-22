export interface Favourite {
  id: string;
  userId: string;
  makeupProductId: string;
  createdAt: string;
}

export interface AddFavouritePayload {
  externalId: number;
  name?: string;
  imgUrl?: string;
}
