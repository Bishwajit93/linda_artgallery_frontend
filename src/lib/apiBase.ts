// lib/apiBase.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") ?? "http://127.0.0.1:8000/api";

export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    // cache: 'no-store', // uncomment during dev if you want no caching
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    next: { revalidate: 60 }, // ISR: refresh every 60s (tweak as you like)
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${path} failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}
