const BASE_URL =
  process.env.NEXT_PUBLIC_LUMINA_API_URL 

export class LuminaApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'LuminaApiError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  token?: string | null;
  body?: unknown;
}

export async function luminaFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', token, body } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new LuminaApiError(res.status, `Error de red: ${res.statusText}`);
  }

  if (!res.ok) {
    const message =
      (json as { message?: string })?.message ?? res.statusText;
    throw new LuminaApiError(res.status, message, json);
  }

  return json as T;
}
