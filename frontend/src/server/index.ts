function getHost() {
  return typeof window !== 'undefined' ? window.location.hostname : 'localhost';
}

function getBaseUrl(port: number) {
  return `http://${getHost()}:${port}`;
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
};

async function request<T>(
  port: number,
  path: string,
  { method = 'GET', body }: RequestOptions = {}
): Promise<T> {
  const response = await fetch(`${getBaseUrl(port)}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const userRequest = <T>(path: string, options?: RequestOptions) =>
  request<T>(4001, path, options);

export const vehicleRequest = <T>(path: string, options?: RequestOptions) =>
  request<T>(4002, path, options);
