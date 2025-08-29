export type Video = {
  id: number;
  title: string | null;
  description: string | null;
  video: string;           // absolute Cloudinary URL
  is_published: boolean;
  order: number;
  created_at: string;      // "dd/mm/YYYY HH:MM:SS"
};
