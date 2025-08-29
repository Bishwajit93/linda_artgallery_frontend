import { getJSON } from "./apiBase";
import { Video } from "@/types/video";

export async function fetchPublishedVideos(): Promise<Video[]> {
  const data = await getJSON<Video[]>("/videos/");
  return data;
}

/** Convenience for hero: get the first published (by backend order). */
export async function fetchHeroVideo(): Promise<Video | null> {
  const list = await fetchPublishedVideos();
  return list.length ? list[0] : null;
}
