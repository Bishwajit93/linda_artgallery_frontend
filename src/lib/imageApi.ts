// lib/imageApi.ts
import { getJson } from "./apiBase";

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

export async function fetchImages(): Promise<GalleryImage[]> {
  return getJson<GalleryImage[]>("/images/");
}
