export interface Review {
  id: string;
  rating: number;
  content: string | null;
  userId: string;
  makeupProductId: string;
  createdAt: string;
}

export interface ReviewWithUser extends Review {
  user: {
    username: string;
  };
}


export interface CreateReviewPayload {
  rating: number;
  content?: string;
}
