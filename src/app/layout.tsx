// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Linda Güzel Galerie",
  description: "Persönliche Kunstgalerie von Linda Güzel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="pt-[120px] flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
