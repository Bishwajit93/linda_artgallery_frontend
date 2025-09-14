// src/app/kontakt/page.tsx
"use client";

import { useState } from "react";

export default function KontaktPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      // 🔗 For now, just simulate sending
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess("✅ Nachricht erfolgreich gesendet!");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch {
      setError("❌ Fehler beim Senden der Nachricht. Bitte später erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-[#C9A227]/30">
        <h1 className="text-3xl font-bold mb-6 text-center">Kontakt</h1>
        <p className="text-center text-gray-600 mb-8">
          Schreiben Sie mir eine Nachricht – ich melde mich schnellstmöglich zurück.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#C9A227]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">E-Mail *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#C9A227]"
            />
          </div>

          {/* Phone (optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">Telefon (optional)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#C9A227]"
            />
          </div>

          {/* Subject (optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">Betreff (optional)</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#C9A227]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">Nachricht *</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#C9A227]"
            />
          </div>

          {/* Buttons */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C9A227] text-white py-2 px-4 rounded-lg hover:bg-[#b8961f] transition"
          >
            {loading ? "Senden…" : "Nachricht senden"}
          </button>

          {/* Feedback */}
          {success && <p className="text-green-600 font-medium">{success}</p>}
          {error && <p className="text-red-600 font-medium">{error}</p>}
        </form>
      </div>
    </main>
  );
}
