import { API_BASE_URL } from "./apiBase";
import { HeroVideo } from "@/types/heroVideo";

export async function fetchHeroVideos(): Promise<HeroVideo[]> {
  const res = await fetch(`${API_BASE_URL}/hero-videos/`);
  if (!res.ok) throw new Error("Failed to fetch hero videos");
  return res.json();
}

export async function createHeroVideo(data: {
  title?: string;
  description?: string;
  video: File;
  is_active?: boolean;
}) {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.description) formData.append("description", data.description);
  formData.append("video", data.video);
  formData.append("is_active", data.is_active ? "true" : "false");

  const res = await fetch(`${API_BASE_URL}/hero-videos/`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("❌ Upload error:", errorData);
    throw new Error(errorData.error || "Upload fehlgeschlagen");
  }

  return res.json();
}


// -------------------
// 3. Update video (PATCH)
// -------------------
export async function updateHeroVideo(
  id: number,
  data: Partial<Pick<HeroVideo, "title" | "description" | "is_active" | "order">> & { video?: File }
) {
  const formData = new FormData();

  if (data.title != null) formData.append("title", String(data.title));
  if (data.description != null) formData.append("description", String(data.description));
  if (data.is_active !== undefined) formData.append("is_active", data.is_active ? "true" : "false");
  if (data.order !== undefined) formData.append("order", String(data.order));
  if (data.video) formData.append("video", data.video);

  const res = await fetch(`${API_BASE_URL}/hero-videos/${id}/`, {
    method: "PATCH",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("❌ Update error:", errorData);
    throw new Error(errorData.error || "Update fehlgeschlagen");
  }

  return res.json();
}

// -------------------
// 4. Delete video
// -------------------
export async function deleteHeroVideo(id: number) {
  const res = await fetch(`${API_BASE_URL}/hero-videos/${id}/`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Löschen fehlgeschlagen");
  }
}