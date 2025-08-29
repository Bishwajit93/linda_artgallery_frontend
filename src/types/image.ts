export type Image = {
  id: number;
  title: string | null;
  description: string | null;
  height: string | number | null;
  width: string | number | null;
  depth: string | number | null;
  image: string;           // absolute Cloudinary URL
  is_published: boolean;
  order: number;
  created_at: string;
};
