"use client";

export default function GaleriePage() {
  return (
    <main
      className="relative text-white px-6 md:px-20 pt-[120px] pb-20 min-h-[calc(100vh-110px-110px)] bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/PageBGPic.jpg')",
      }}
    >
      {/* Soft dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-brightness-75 z-0" />

      {/* Content */}
      <section id="home" className="relative z-10 scroll-mt-28 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Galerie</h1>
        <p className="leading-relaxed">
          Hier wird bald eine wunderschöne Galerie mit Kunstwerken erscheinen.  
          Bleib gespannt – es wird sich lohnen!
        </p>
      </section>
    </main>
  );
}
