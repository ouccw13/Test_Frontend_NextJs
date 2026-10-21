const API_BASE_URL = process.env.NEXT_PUBLIC_DOTNET_NOTES_API_URL;

interface ApiRequestOptions extends RequestInit {
  token?: string;
}

export async function apiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { headers, ...restOptions } = options;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: {

      "Content-Type": "application/json",
      ...headers,

    },

  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw new Error(
      errorBody?.message ?? `Request failed with status ${response.status}`,
    );
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}