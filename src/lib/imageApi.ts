import { getJSON } from "./apiBase";
import { Image } from "@/types/image";

export async function fetchPublishedImages(): Promise<Image[]> {
  const data = await getJSON<Image[]>("/images/");
  return data;
}
