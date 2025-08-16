// lib/videoApi.ts
// -----------------------------------------------------------
// PURPOSE OF THIS FILE:
// This file contains all **frontend API helper functions** 
// related to video management. 
// It provides functions to:
//   - Fetch the list of videos
//   - Upload a new video (via Cloudinary, with progress tracking)
//   - Delete an existing video
//   - Get a Cloudinary signature from Django backend
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

// Cloudinary response type
type CloudinaryUploadResponse = {
  secure_url: string;
  public_id: string;
  [key: string]: unknown; // keep flexible for other fields
};

// ------------------
// HELPERS
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
// API FUNCTIONS
// ------------------

// 1. Get list of all videos
export async function fetchVideos(): Promise<GalleryVideo[]> {
  return getJson<GalleryVideo[]>("/videos/");
}

// 2. Get Cloudinary signature from Django backend
export async function getCloudinarySignature(folder = "linda/videos") {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/cloudinary/signature/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder }),
      credentials: "include", // if Django auth cookies are needed
    }
  );

  if (!response.ok) {
    throw new Error("❌ Failed to get Cloudinary signature");
  }

  return response.json();
}

// 3. Upload a new video (to Cloudinary, then save metadata in Django)
//    - Accepts title, description, and the file
//    - Optional onProgress callback to show % progress
export async function uploadVideo(
  file: File,
  title: string,
  description?: string,
  onProgress?: (percent: number) => void
): Promise<GalleryVideo> {
  // Step 1: Get signature from Django
  const { signature, timestamp, folder, api_key, cloud_name } =
    await getCloudinarySignature();

  // Step 2: Upload file to Cloudinary
  const cloudinaryUpload: CloudinaryUploadResponse = await new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`
      );

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);
      formData.append("timestamp", timestamp.toString());
      formData.append("folder", folder);
      formData.append("signature", signature);

      // progress tracking
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`❌ Cloudinary upload failed: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () =>
        reject(new Error("❌ Network error during Cloudinary upload"));
      xhr.ontimeout = () =>
        reject(new Error("⏳ Cloudinary upload timed out"));
      xhr.timeout = 60000; // 60s timeout for big videos

      xhr.send(formData);
    }
  );

  // Step 3: Save metadata in Django
  const backendRes = await fetch(`${API_BASE_URL}/videos/upload/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      description,
      file_url: cloudinaryUpload.secure_url, // Cloudinary video URL
      poster_url: cloudinaryUpload.secure_url.replace(".mp4", ".jpg"), // optional thumbnail trick
    }),
  });

  if (!backendRes.ok) {
    throw new Error("❌ Failed to save video in backend");
  }

  return backendRes.json();
}

// 4. Delete a video by ID
export async function deleteVideo(id: number): Promise<void> {
  await retryFetch(`${API_BASE_URL}/videos/${id}/delete/`, { method: "DELETE" });
}
