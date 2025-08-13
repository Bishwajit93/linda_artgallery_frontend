import HeroVideoSection from "@/components/HeroVideoSection";
import VideoManager from "@/components/VideoManager";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroVideoSection />
      <VideoManager />
    </main>
  );
}
