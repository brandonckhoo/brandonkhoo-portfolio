import Hero from "@/components/sections/Hero";
import CompanyCarousel from "@/components/sections/CompanyCarousel";
import FeaturedWork from "@/components/sections/FeaturedWork";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import SideProjects from "@/components/sections/SideProjects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CompanyCarousel />
      <FeaturedWork />
      <About />
      <Experience />
      <SideProjects />
      <Contact />
      <Footer />
    </main>
  );
}
