// lib/apiBase.ts

// Remove trailing slash from URL if present
const envApiUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

// Fail fast if environment variable is not set
if (!envApiUrl) {
  throw new Error(
    "❌ Environment variable NEXT_PUBLIC_BACKEND_URL is missing. " +
    "Set it in your .env.local for development or in Vercel Environment Variables for production."
  );
}

// Export the API base URL
export const API_BASE_URL = envApiUrl;

/**
 * Helper to GET JSON data from the API.
 * @param path - Path to append to the API base URL (should start with `/`)
 * @param init - Optional RequestInit options
 * @returns Parsed JSON data
 */
export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    next: { revalidate: 60 }, // Incremental static regeneration every 60s
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${path} failed: ${res.status} ${text}`);
  }

  return res.json() as Promise<T>;
}
