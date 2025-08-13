"use client";

import { useEffect, useState } from "react";
import { deleteVideo, fetchVideos, GalleryVideo, uploadVideoFD } from "@/lib/videoApi";

export default function VideoManager() {
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [busy, setBusy] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [isPublished, setIsPublished] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [poster, setPoster] = useState<File | null>(null);

  const load = async () => {
    try {
      const data = await fetchVideos();
      setVideos(data);
    } catch (e) {
      console.error(e);
      alert("Failed to load videos");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Choose a video file");
      return;
    }
    try {
      setBusy(true);
      const fd = new FormData();
      fd.append("title", title || "Untitled");
      if (description) fd.append("description", description);
      fd.append("order", String(order));
      fd.append("is_published", String(isPublished));
      fd.append("file", file);
      if (poster) fd.append("poster", poster);

      await uploadVideoFD(fd);
      // reset
      setTitle("");
      setDescription("");
      setOrder(0);
      setIsPublished(true);
      setFile(null);
      setPoster(null);
      // refresh list
      await load();
    } catch (err: any) {
      console.error(err);
      alert("Upload failed:\n" + (err?.message || "Unknown error"));
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete this video?")) return;
    try {
      setBusy(true);
      await deleteVideo(id);
      await load();
    } catch (e: any) {
      console.error(e);
      alert("Delete failed:\n" + (e?.message || "Unknown error"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold mb-4">Manage Videos (temporary)</h2>

      {/* Upload form */}
      <form
        onSubmit={onUpload}
        className="border rounded-lg p-4 grid gap-3 bg-white"
      >
        <div className="grid md:grid-cols-2 gap-3">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Title</span>
            <input
              className="border rounded px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Video title"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Order</span>
            <input
              type="number"
              className="border rounded px-3 py-2"
              value={order}
              onChange={(e) => setOrder(parseInt(e.target.value || "0", 10))}
            />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm font-medium">Description</span>
          <textarea
            className="border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Optional description"
          />
        </label>

        <div className="grid md:grid-cols-2 gap-3">
          <label className="grid gap-1">
            <span className="text-sm font-medium">Video file (.mp4)</span>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium">Poster image (optional)</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPoster(e.target.files?.[0] || null)}
            />
          </label>
        </div>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <span className="text-sm">Published</span>
        </label>

        <div>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center px-4 py-2 rounded bg-black text-white disabled:opacity-60"
          >
            {busy ? "Uploading..." : "Upload video"}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((v) => (
          <div key={v.id} className="border rounded-lg overflow-hidden bg-white">
            <div className="aspect-video bg-neutral-100">
              {v.poster_url ? (
                <img src={v.poster_url} alt={v.title} className="w-full h-full object-cover" />
              ) : (
                <video src={v.file_url || ""} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="p-3">
              <div className="font-medium line-clamp-1">{v.title}</div>
              <div className="text-xs text-neutral-500">
                #{v.order} • {v.is_published ? "Published" : "Hidden"}
              </div>
              <div className="mt-3 flex gap-2">
                <a
                  href={v.file_url || "#"}
                  target="_blank"
                  className="px-3 py-1.5 text-sm rounded border"
                >
                  Open
                </a>
                <button
                  onClick={() => onDelete(v.id)}
                  disabled={busy}
                  className="px-3 py-1.5 text-sm rounded border border-red-600 text-red-600 disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {!videos.length && (
          <div className="text-sm text-neutral-600">No published videos yet.</div>
        )}
      </div>
    </section>
  );
}
