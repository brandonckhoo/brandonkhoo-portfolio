import { siteContent } from "@/content/site";

const { footer } = siteContent;

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-10">
      <div className="max-w-content mx-auto content-px flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-3">
          © {footer.year} {footer.name}
        </p>

        <nav
          className="flex items-center gap-6"
          aria-label="Footer navigation"
        >
          {footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm text-ink-3 hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
