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
        <form className="bg-black/60 backdrop-blur-md p-6 rounded-lg shadow-lg border border-orange-400/40 shadow-orange-500/20 space-y-6">
          {/* Name fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Vorname *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-md bg-transparent border border-orange-400/60 shadow-md shadow-orange-500/30 focus:border-orange-400 focus:shadow-orange-500 focus:shadow-lg outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Nachname *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 rounded-md bg-transparent border border-orange-400/60 shadow-md shadow-orange-500/30 focus:border-orange-400 focus:shadow-orange-500 focus:shadow-lg outline-none transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">E-Mail *</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-md bg-transparent border border-orange-400/60 shadow-md shadow-orange-500/30 focus:border-orange-400 focus:shadow-orange-500 focus:shadow-lg outline-none transition"
            />
          </div>

          {/* Phone (optional) */}
          <div>
            <label className="block mb-2 font-medium">Telefonnummer (optional)</label>
            <input
              type="tel"
              className="w-full px-4 py-2 rounded-md bg-transparent border border-orange-400/60 shadow-md shadow-orange-500/30 focus:border-orange-400 focus:shadow-orange-500 focus:shadow-lg outline-none transition"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-2 font-medium">Betreff *</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-md bg-transparent border border-orange-400/60 shadow-md shadow-orange-500/30 focus:border-orange-400 focus:shadow-orange-500 focus:shadow-lg outline-none transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 font-medium">Nachricht *</label>
            <textarea
              required
              rows={5}
              className="w-full px-4 py-2 rounded-md bg-transparent border border-orange-400/60 shadow-md shadow-orange-500/30 focus:border-orange-400 focus:shadow-orange-500 focus:shadow-lg outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 bg-transparent border border-orange-400 text-orange-400 rounded-md font-semibold tracking-wide shadow-md shadow-orange-500/30 hover:bg-orange-400 hover:text-black hover:shadow-orange-500 hover:shadow-lg transition"
            >
              Nachricht senden
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
