import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import SideProjects from "@/components/sections/SideProjects";
import ProductPrinciples from "@/components/sections/ProductPrinciples";
import HowIShip from "@/components/sections/HowIShip";
import PhotoMosaic from "@/components/sections/PhotoMosaic";
import AmplitudeBlog from "@/components/sections/AmplitudeBlog";
import ProductStackSection from "@/components/sections/ProductStack";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedWork />
      <SideProjects />
      <ProductPrinciples />
      <HowIShip />
      <PhotoMosaic />
      <AmplitudeBlog />
      <ProductStackSection />
      <Experience />
      <Footer />
    </main>
  );
}
