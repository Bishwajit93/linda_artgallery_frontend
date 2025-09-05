// HeroVideo type (matches HeroVideoSerializer)
export interface HeroVideo {
  id: number;
  title: string | null;
  description: string | null;
  order: number;
  is_active: boolean;
  created_at: string;      // ISO timestamp
  video_url: string | null;
}
