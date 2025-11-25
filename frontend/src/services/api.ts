const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

const buildUrl = (path: string) => {
  if (!API_BASE_URL) return path;

  const trimmedBase = API_BASE_URL.replace(/\/$/, '');
  const trimmedPath = path.replace(/^\//, '');

  return `${trimmedBase}/${trimmedPath}`;
};

type RequestOptions = RequestInit & { skipAuth?: boolean };

type ApiErrorPayload = {
  message?: string;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (isJson && (data as ApiErrorPayload)?.message) ||
      (typeof data === 'string' ? data : undefined) ||
      response.statusText ||
      'Erro desconhecido ao comunicar com a API.';

    throw new Error(message);
  }

  return data as T;
}

async function request<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const { headers, skipAuth, ...rest } = options;
  const authorization = !skipAuth ? localStorage.getItem('accessToken') : null;

  const response = await fetch(buildUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(authorization ? { Authorization: `Bearer ${authorization}` } : {}),
      ...headers
    },
    ...rest
  });

  return parseResponse<T>(response);
}

export const api = {
  get: <T = unknown>(path: string, options?: RequestOptions) =>
    request<T>(path, { method: 'GET', ...options }),
  post: <T = unknown, B = unknown>(path: string, body?: B, options?: RequestOptions) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined, ...options }),
  put: <T = unknown, B = unknown>(path: string, body?: B, options?: RequestOptions) =>
    request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined, ...options }),
  delete: <T = unknown>(path: string, options?: RequestOptions) =>
    request<T>(path, { method: 'DELETE', ...options })
};

export type LoginResponse = {
  access: string;
  refresh: string;
};

export const login = (credentials: { email: string; password: string }) =>
  api.post<LoginResponse>('/auth/login', credentials, { skipAuth: true });

export default api;
