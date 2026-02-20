"use client";

import { useState, useEffect } from "react";
import { siteContent } from "@/content/site";
import { cn } from "@/lib/utils";

const { nav, meta } = siteContent;

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sectionIds = nav.links.map((l) => l.href.replace("#", ""));

    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: "-80px 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
        aria-label="Main navigation"
      >
        <div className="max-w-content mx-auto content-px h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl text-ink hover:opacity-75 transition-opacity"
            aria-label="Brandon Khoo — Home"
          >
            {meta.name}
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {nav.links.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                    isActive
                      ? "text-ink font-medium"
                      : "text-ink-2 hover:text-ink"
                  )}
                >
                  {link.label}
                </button>
              );
            })}

            <a
              href={nav.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-2 bg-ink text-white rounded-pill text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer min-h-[40px] inline-flex items-center"
            >
              {nav.cta.label}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className={cn(
                "block w-5 h-0.5 bg-ink rounded-full transition-all duration-300",
                mobileOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "block w-5 h-0.5 bg-ink rounded-full transition-all duration-300",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block w-5 h-0.5 bg-ink rounded-full transition-all duration-300",
                mobileOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-bg/98 backdrop-blur-md flex flex-col justify-center px-8 transition-all duration-300 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-2">
          {nav.links.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left py-4 text-3xl font-display text-ink border-b border-border last:border-0 cursor-pointer hover:opacity-60 transition-opacity"
              style={{ transitionDelay: mobileOpen ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </button>
          ))}
          <a
            href={nav.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-6 py-3.5 bg-ink text-white rounded-pill text-base font-medium cursor-pointer self-start inline-flex items-center"
          >
            {nav.cta.label}
          </a>
        </div>
      </div>
    </>
  );
}
