// VideoManager.tsx
// ------------------------------------------------------------
// Videos manager:
// - Fetch videos from Django backend
// - Upload video via Cloudinary (with Django signature)
// - Save metadata to backend
// - Delete videos
// - Display video list
// ------------------------------------------------------------

"use client";

import { useEffect, useState } from "react";
import { deleteVideo, fetchVideos, GalleryVideo, uploadVideo } from "@/lib/videoApi";

export default function VideoManager() {
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [busy, setBusy] = useState(false);

  // Upload form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [isPublished, setIsPublished] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  // ----------------------------
  // Load all videos
  // ----------------------------
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

  // ----------------------------
  // Upload handler
  // ----------------------------
  const onUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Choose a video file");
      return;
    }

    try {
      setBusy(true);
      setProgress(0);

      // Upload to Cloudinary + save in Django
      await uploadVideo(file, title || "Untitled", description, (p) => setProgress(p));

      // Reset form + reload
      setTitle("");
      setDescription("");
      setOrder(0);
      setIsPublished(true);
      setFile(null);
      setProgress(0);
      await load();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(err);
      alert("Upload failed:\n" + message);
    } finally {
      setBusy(false);
    }
  };

  // ----------------------------
  // Delete handler
  // ----------------------------
  const onDelete = async (id: number) => {
    if (!confirm("Delete this video?")) return;
    try {
      setBusy(true);
      await deleteVideo(id);
      await load();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Unknown error";
      console.error(e);
      alert("Delete failed:\n" + message);
    } finally {
      setBusy(false);
    }
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-xl font-semibold mb-4">Manage Videos</h2>

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

        {/* Video input */}
        <label className="grid gap-1 border border-gray-300 rounded-lg p-3 bg-gray-50">
          <span className="text-sm font-medium">Video file (.mp4)</span>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-700 
                       file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-black file:text-white
                       hover:file:bg-gray-800 cursor-pointer"
          />
          {file && (
            <span className="text-xs text-green-600 mt-1">
              Selected: {file.name}
            </span>
          )}
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <span className="text-sm">Published</span>
        </label>

        {progress > 0 && progress < 100 && (
          <div className="text-sm text-blue-600">Uploading... {progress}%</div>
        )}

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

      {/* Video list */}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((v) => (
          <div key={v.id} className="border rounded-lg overflow-hidden bg-white">
            <div className="aspect-video bg-neutral-100 flex items-center justify-center">
              {v.file_url ? (
                <video
                  src={v.file_url}
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <span className="text-gray-500 text-sm">No video available</span>
              )}
            </div>
            <div className="p-3">
              <div className="font-medium line-clamp-1">{v.title}</div>
              <div className="text-xs text-neutral-500">
                #{v.order} • {v.is_published ? "Published" : "Hidden"}
              </div>
              <div className="mt-3 flex gap-2">
                {v.file_url && (
                  <a
                    href={v.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm rounded border"
                  >
                    Open
                  </a>
                )}
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
