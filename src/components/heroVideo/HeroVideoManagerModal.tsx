"use client";

import { useEffect, useState } from "react";
import {
  fetchHeroVideos,
  deleteHeroVideo,
  updateHeroVideo,
} from "@/lib/heroVideoApi";
import { HeroVideo } from "@/types/heroVideo";
import HeroVideoUploadForm from "./HeroVideoUploadForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function HeroVideoManagerModal({ isOpen, onClose }: Props) {
  const [videos, setVideos] = useState<HeroVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editActive, setEditActive] = useState(true);

  // Refresh function
  const refreshVideos = async () => {
    setLoading(true);
    try {
      const data = await fetchHeroVideos();
      setVideos(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unbekannter Fehler beim Laden";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Load on open
  useEffect(() => {
    if (isOpen) refreshVideos();
  }, [isOpen]);

  // Delete video
  const handleDelete = async (id: number) => {
    if (!confirm("Wirklich löschen?")) return;
    try {
      await deleteHeroVideo(id);
      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unbekannter Fehler beim Löschen";
      alert("❌ Löschen fehlgeschlagen: " + message);
    }
  };

  // Start editing
  const handleEdit = (video: HeroVideo) => {
    setEditingId(video.id);
    setEditTitle(video.title || "");
    setEditDescription(video.description || "");
    setEditActive(video.is_active);
  };

  // Save editing
  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      await updateHeroVideo(editingId, {
        title: editTitle,
        description: editDescription,
        is_active: editActive,
      });
      setEditingId(null);
      refreshVideos();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unbekannter Fehler beim Update";
      alert("❌ Update fehlgeschlagen: " + message);
    }
  };

  // Toggle publish on/off
  const handleTogglePublish = async (id: number, newState: boolean) => {
    try {
      await updateHeroVideo(id, { is_active: newState });
      setVideos((prev) =>
        prev.map((video) =>
          video.id === id ? { ...video, is_active: newState } : video
        )
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unbekannter Fehler beim Umschalten";
      alert("❌ Fehler beim Umschalten: " + message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="relative bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6 shadow-xl">
        {/* Close button fixed top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-full"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">🎥 Hero Video Manager</h2>

        {/* Upload button */}
        {!showUploadForm && (
          <button
            onClick={() => setShowUploadForm(true)}
            className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 shadow-md"
          >
            + Neues Video hochladen
          </button>
        )}

        {/* Upload Form */}
        {showUploadForm && (
          <div className="mb-6">
            <HeroVideoUploadForm
              onUploadSuccess={() => {
                refreshVideos();
                setShowUploadForm(false);
              }}
            />
            <button
              onClick={() => setShowUploadForm(false)}
              className="mt-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Abbrechen
            </button>
          </div>
        )}

        <hr className="my-4" />

        {/* Video List */}
        {loading && <p>Lade Videos…</p>}
        {error && <p className="text-red-500">Fehler: {error}</p>}
        {!loading && videos.length === 0 && <p>Keine Videos vorhanden.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="border rounded-2xl p-4 shadow-md flex flex-col space-y-3 bg-gray-50"
            >
              {editingId === video.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full border rounded-lg p-2"
                    placeholder="Titel"
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full border rounded-lg p-2"
                    placeholder="Beschreibung"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-emerald-200 text-emerald-800 px-4 py-1 rounded-lg hover:bg-emerald-300"
                    >
                      Speichern
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-300 text-gray-800 px-4 py-1 rounded-lg hover:bg-gray-400"
                    >
                      Abbrechen
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-semibold">{video.title || "Untitled"}</p>
                  <p className="text-sm text-gray-600">
                    {video.description || "Keine Beschreibung"}
                  </p>
                  {video.video_url ? (
                    <video
                      src={video.video_url}
                      controls
                      className="w-full max-h-48 rounded-lg bg-black"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">No video file</p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    {/* Left: Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(video)}
                        className="bg-blue-100 text-blue-800 px-4 py-1 rounded-lg hover:bg-blue-200"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="bg-red-100 text-red-800 px-4 py-1 rounded-lg hover:bg-red-200"
                      >
                        Löschen
                      </button>
                    </div>

                    {/* Right: Publish Toggle */}
                    <button
                      type="button"
                      onClick={() =>
                        handleTogglePublish(video.id, !video.is_active)
                      }
                      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                        video.is_active ? "bg-emerald-400" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          video.is_active ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
