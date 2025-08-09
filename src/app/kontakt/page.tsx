"use client";

export default function KontaktPage() {
  return (
    <main
      className="relative text-white px-6 md:px-20 pt-[120px] pb-20 min-h-[calc(100vh-110px-110px)] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/PageBGPic.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-brightness-75 z-0" />

      {/* Content */}
      <section id="kontakt" className="relative z-10 scroll-mt-28 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">Kontakt</h1>
        <p className="text-center mb-10">
          Kontaktiere Linda über das Formular oder die sozialen Medien. Wir freuen
          uns auf deine Nachricht!
        </p>

        {/* Form */}
        <form className="bg-black/35 p-6 rounded-lg border border-[#e6dfd0]/40 shadow-none space-y-6">
          {/* Name fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-white/85">Vorname *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-md bg-transparent border border-[#e6dfd0]/50 focus:border-[#8aa9c0] focus:ring-2 focus:ring-[#8aa9c0]/30 outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-white/85">Nachname *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-md bg-transparent border border-[#e6dfd0]/50 focus:border-[#8aa9c0] focus:ring-2 focus:ring-[#8aa9c0]/30 outline-none transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-white/85">E‑Mail *</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-md bg-transparent border border-[#e6dfd0]/50 focus:border-[#8aa9c0] focus:ring-2 focus:ring-[#8aa9c0]/30 outline-none transition"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium text-white/85">Telefonnummer (optional)</label>
            <input
              type="tel"
              className="w-full px-4 py-2 rounded-md bg-transparent border border-[#e6dfd0]/50 focus:border-[#8aa9c0] focus:ring-2 focus:ring-[#8aa9c0]/30 outline-none transition"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-2 font-medium text-white/85">Betreff *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-md bg-transparent border border-[#e6dfd0]/50 focus:border-[#8aa9c0] focus:ring-2 focus:ring-[#8aa9c0]/30 outline-none transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 font-medium text-white/85">Nachricht *</label>
            <textarea
              required
              rows={5}
              className="w-full px-4 py-2 rounded-md bg-transparent border border-[#e6dfd0]/50 focus:border-[#8aa9c0] focus:ring-2 focus:ring-[#8aa9c0]/30 outline-none transition resize-none"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 rounded-md border border-[#b59b6a]/60 text-white/95 hover:bg-[#b59b6a]/15 hover:border-[#b59b6a] transition"
            >
              Nachricht senden
            </button>
          </div>
        </form>

      </section>
    </main>
  );
}
