// lib/imageApi.ts
import { API_BASE_URL, getJson } from "./apiBase";

export type GalleryImage = {
  id: number;
  title: string;
  description?: string;
  image: string;          // file field (write)
  image_url: string | null; // absolute URL (read)
  is_published: boolean;
  order: number;
  created_at: string;
};

const withTimeout = (promise: Promise<Response>, ms = 20000) =>
  Promise.race([
    promise,
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("⏳ Request timed out")), ms)
    ),
  ]);

async function retryFetch(url: string, options: RequestInit, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await withTimeout(fetch(url, options));
      if (!res.ok) throw new Error(await res.text());
      return res;
    } catch (err) {
      if (i === retries) throw err;
    }
  }
  throw new Error("❌ Failed after retries");
}

export async function fetchImages(): Promise<GalleryImage[]> {
  return getJson<GalleryImage[]>("/images/");
}

// Upload with progress
export async function uploadImageFD(
  fd: FormData,
  onProgress?: (percent: number) => void
): Promise<GalleryImage> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}/images/upload/`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`❌ Upload failed: ${xhr.statusText}`));
      }
    };

    xhr.onerror = () => reject(new Error("❌ Network error during upload"));
    xhr.ontimeout = () => reject(new Error("⏳ Upload timed out"));
    xhr.timeout = 30000; // 30s timeout
    xhr.send(fd);
  });
}

export async function deleteImage(id: number): Promise<void> {
  await retryFetch(`${API_BASE_URL}/images/${id}/delete/`, { method: "DELETE" });
}
