// lib/videoApi.ts
// -----------------------------------------------------------
// PURPOSE OF THIS FILE:
// This file contains all **frontend API helper functions** 
// related to video management. 
// It provides functions to:
//   - Fetch the list of videos
//   - Upload a new video (with progress tracking)
//   - Delete an existing video
//
// HOW IT FITS IN THE PROJECT:
// - The React components (like VideoManager.tsx) import these 
//   helpers to interact with the Django backend.
// - Keeps API logic separated and reusable across the app.
// -----------------------------------------------------------

import { API_BASE_URL, getJson } from "./apiBase";

// ------------------
// TYPE DEFINITIONS
// ------------------
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

// ------------------
// HELPER FUNCTIONS
// ------------------

// Timeout helper → ensures requests fail if they take too long
const withTimeout = (promise: Promise<Response>, ms = 20000) =>
  Promise.race([
    promise,
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("⏳ Request timed out")), ms)
    ),
  ]);

// Retry helper → retries failed requests (e.g. network hiccups)
async function retryFetch(url: string, options: RequestInit, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await withTimeout(fetch(url, options));
      if (!res.ok) throw new Error(await res.text());
      return res;
    } catch (err) {
      if (i === retries) throw err; // last attempt → throw error
    }
  }
  throw new Error("❌ Failed after retries");
}

// ------------------
// MAIN API FUNCTIONS
// ------------------

// 1. Get list of all videos
export async function fetchVideos(): Promise<GalleryVideo[]> {
  return getJson<GalleryVideo[]>("/videos/");
}

// 2. Upload a new video file using FormData
//    - Accepts an optional onProgress callback to show % progress
export async function uploadVideoFD(
  fd: FormData,
  onProgress?: (percent: number) => void
): Promise<GalleryVideo> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_BASE_URL}/videos/upload/`);

    // progress tracking
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    // handle success
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`❌ Upload failed: ${xhr.statusText}`));
      }
    };

    // handle errors
    xhr.onerror = () => reject(new Error("❌ Network error during upload"));
    xhr.ontimeout = () => reject(new Error("⏳ Upload timed out"));
    xhr.timeout = 30000; // 30s timeout

    // send request
    xhr.send(fd);
  });
}

// 3. Delete a video by ID
export async function deleteVideo(id: number): Promise<void> {
  await retryFetch(`${API_BASE_URL}/videos/${id}/delete/`, { method: "DELETE" });
}
