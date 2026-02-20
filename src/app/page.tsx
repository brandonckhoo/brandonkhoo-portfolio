import Hero from "@/components/sections/Hero";
import FeaturedWork from "@/components/sections/FeaturedWork";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import SideProjects from "@/components/sections/SideProjects";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedWork />
      <SideProjects />
      <Experience />
      <Footer />
    </main>
  );
}
