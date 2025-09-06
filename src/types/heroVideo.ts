// src/types/heroVideo.ts
export interface HeroVideo {
  id: number;
  title?: string | null;
  description?: string | null;
  order: number;
  is_active: boolean;
  created_at: string;
  video_url: string | null;  // ✅ Only use Pull Zone URL
}
