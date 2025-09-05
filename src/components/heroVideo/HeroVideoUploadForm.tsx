"use client";

import { useState } from "react";
import { createHeroVideo } from "@/lib/heroVideoApi";

export default function HeroVideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Bitte eine Videodatei auswählen.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await createHeroVideo({ title, description, video: file, is_active: isActive });
      setSuccess("✅ Video erfolgreich hochgeladen!");
      setTitle("");
      setDescription("");
      setFile(null);
      setIsActive(true);
    } catch (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      err: any
    ) {
      setError(err.message || "Upload fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 border rounded-lg bg-white shadow max-w-md mx-auto"
    >
      <h2 className="text-lg font-bold mb-2">Hero Video hochladen</h2>

      <input
        type="text"
        placeholder="Titel (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded p-2 focus:ring-2 focus:ring-black"
      />

      <textarea
        placeholder="Beschreibung (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded p-2 focus:ring-2 focus:ring-black"
      />

      <div>
        <label className="block font-medium mb-1">Videodatei auswählen</label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-black file:text-white hover:file:bg-gray-800"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="h-4 w-4 border-gray-300 rounded"
        />
        <span>Veröffentlichen (öffentlich sichtbar)</span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
      >
        {loading ? "Hochladen…" : "Video hochladen"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600 font-medium">{success}</p>}
    </form>
  );
}
