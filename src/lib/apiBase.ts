export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, "") || "";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export { getJSON };
