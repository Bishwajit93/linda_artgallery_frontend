// ArtworkImage type (matches ArtworkImageSerializer)
export interface ArtworkImage {
  id: number;
  image_url: string | null;
  height_cm: string;     // DecimalField -> string in API JSON
  width_cm: string;      // DecimalField -> string in API JSON
  order: number;
  uploaded_at: string;   // ISO timestamp
}

// ArtworkVideo type (matches ArtworkVideoSerializer)
export interface ArtworkVideo {
  id: number;
  video_url: string | null;
  uploaded_at: string;   // ISO timestamp
}

// Artwork type (matches ArtworkSerializer)
export interface Artwork {
  id: number;
  title: string | null;
  description: string | null;
  category: "highlight" | "recent" | "general";
  is_published: boolean;
  created_at: string;     // ISO timestamp
  images: ArtworkImage[];
  videos: ArtworkVideo[];
}
