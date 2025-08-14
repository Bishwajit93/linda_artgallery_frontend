// lib/videoApi.ts
import { API_BASE_URL, getJson } from "./apiBase";

export type GalleryVideo = {
  id: number;
  title: string;
  description?: string;
  file_url: string | null;
  poster_url: string | null;
  size_label?: string | null;
  recorded_at?: string | null;
  duration_seconds?: number | null;
  order: number;
  is_published: boolean;
  created_at: string;
};

// Timeout helper
const withTimeout = (promise: Promise<Response>, ms = 20000) =>
  Promise.race([
    promise,
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("⏳ Request timed out")), ms)
    ),
  ]);

// Retry helper
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

export async function fetchVideos(): Promise<GalleryVideo[]> {
  return getJson<GalleryVideo[]>("/videos/");
}

// Upload with progress
export async function uploadVideoFD(
  fd: FormData,
  onProgress?: (percent: number) => void
): Promise<GalleryVideo> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}/videos/upload/`);

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

export async function deleteVideo(id: number): Promise<void> {
  await retryFetch(`${API_BASE_URL}/videos/${id}/delete/`, { method: "DELETE" });
}
