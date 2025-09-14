"use client";

import HeroVideoSection from "@/components/heroVideo/HeroVideoSection";

export default function HomePage() {
  return (
    <>
      {/* Hero video at the top */}
      <HeroVideoSection />

      {/* Example: highlights / other content */}
      <section className="max-w-6xl mx-auto py-20 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Highlights</h2>
        <p className="text-gray-700">
          Hier können die Kunstwerke oder besondere Inhalte stehen.
        </p>
      </section>
    </>
  );
}
