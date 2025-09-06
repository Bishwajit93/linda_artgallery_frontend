// src/types/artwork.ts
export interface ArtworkImage {
  id: number;
  image_url: string | null;
  height_cm: string;
  width_cm: string;
  order: number;
  uploaded_at: string;
}

export interface ArtworkVideo {
  id: number;
  video_url: string | null;  // ✅ only Pull Zone link
  uploaded_at: string;
}

export interface Artwork {
  id: number;
  title?: string | null;
  description?: string | null;
  category: "highlight" | "recent" | "general";
  is_published: boolean;
  created_at: string;
  images: ArtworkImage[];
  videos: ArtworkVideo[];
}
