import HeroVideoUploadForm from "@/components/heroVideo/HeroVideoUploadForm";
import HeroVideoSection from "@/components/heroVideo/HeroVideo";
export default function HomePage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Linda Art Gallery</h1>
      <HeroVideoSection />
      <HeroVideoUploadForm />
    </main>
  );
}
