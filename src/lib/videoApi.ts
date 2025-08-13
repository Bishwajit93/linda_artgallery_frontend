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

export async function fetchVideos(): Promise<GalleryVideo[]> {
  return getJson<GalleryVideo[]>("/videos/");
}

export async function uploadVideoFD(fd: FormData): Promise<GalleryVideo> {
  const res = await fetch(`${API_BASE_URL}/videos/upload/`, {
    method: "POST",
    body: fd,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function deleteVideo(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/videos/${id}/delete/`, { method: "DELETE" });
  if (!res.ok) throw new Error(await res.text());
}
