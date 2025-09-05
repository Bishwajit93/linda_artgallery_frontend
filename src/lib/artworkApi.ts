// src/lib/artworkApi.ts
import { apiGet } from "./apiBase";
import { Artwork } from "@/types/artwork";

export async function fetchArtworks(): Promise<Artwork[]> {
  return apiGet<Artwork[]>("/artworks/");
}

export async function fetchArtwork(id: number): Promise<Artwork> {
  return apiGet<Artwork>(`/artworks/${id}/`);
}
