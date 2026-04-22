import HeroSection from "./landing/HeroSection";
import AboutSection from "./landing/AboutSection";
import ProductsSection from "./landing/ProductsSection";

export default function LandingPage() {
  return (
    <main className="flex flex-col flex-1">
      <HeroSection />
      <AboutSection />
      <ProductsSection />
    </main>
  );
}
