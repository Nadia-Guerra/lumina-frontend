import { luminaFetch } from '@/infra/api/luminaApiClient';
import type { User } from '@/domain/entities/User';

interface RegisterPayload {
  email: string;
  password: string;
  username: string;
}

interface AuthApiResponse {
  success: boolean;
  message: string;
  data: User;
}

export async function register(payload: RegisterPayload): Promise<User> {
  const res = await luminaFetch<AuthApiResponse>('/auth/register', {
    method: 'POST',
    body: payload,
  });
  return res.data;
}

export async function loginWithToken(idToken: string): Promise<User> {
  const res = await luminaFetch<AuthApiResponse>('/auth/login', {
    method: 'POST',
    token: idToken,
  });
  return res.data;
}
