// src/lib/artworkApi.ts
import { apiGet } from "./apiBase";
import { Artwork } from "@/types/artwork";

// ----------------------
// Fetch all artworks
// ----------------------
export async function fetchArtworks(): Promise<Artwork[]> {
  return apiGet<Artwork[]>("/artworks/");
}

// (optional) fetch single artwork by id
export async function fetchArtwork(id: number): Promise<Artwork> {
  return apiGet<Artwork>(`/artworks/${id}/`);
}
