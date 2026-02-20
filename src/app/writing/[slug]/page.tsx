import { notFound } from "next/navigation";
import Link from "next/link";
import { writingPostDetails } from "@/content/site";
import Footer from "@/components/sections/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return writingPostDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = writingPostDetails.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Brandon Khoo` };
}

const categoryColors: Record<string, string> = {
  AI: "var(--color-accent-blush)",
  Platform: "var(--color-accent-lavender)",
  Product: "var(--color-accent-sage)",
};

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = writingPostDetails.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <main className="pt-24 bg-bg min-h-screen">
        {/* Back */}
        <div className="max-w-content mx-auto content-px mb-10">
          <Link
            href="/#writing"
            className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors"
          >
            ← Back to writing
          </Link>
        </div>

        <div className="max-w-content mx-auto content-px">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12 lg:gap-16 items-start">
            {/* ── Article ─────────────────────────────── */}
            <article>
              {/* Meta */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: categoryColors[post.category] }}
                />
                <span className="text-xs font-medium text-ink-3 uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-xs text-ink-3">·</span>
                <span className="text-xs text-ink-3">{post.date}</span>
                <span className="text-xs text-ink-3">·</span>
                <span className="text-xs text-ink-3">{post.readingTime}</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6 text-balance">
                {post.title}
              </h1>

              {/* Intro */}
              <p className="text-lg text-ink-2 leading-relaxed mb-10 pb-10 border-b border-border">
                {post.intro}
              </p>

              {/* Sections */}
              <div className="prose-custom">
                {post.sections.map((section) => (
                  <div key={section.anchor} id={section.anchor} className="mb-10">
                    <h2 className="font-display text-2xl text-ink mb-4">
                      {section.heading}
                    </h2>
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="text-base text-ink-2 leading-[1.75] mb-4">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}

                {/* Closing */}
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-base text-ink-2 leading-[1.75] italic">
                    {post.closing}
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <Link
                  href="/#writing"
                  className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors"
                >
                  ← Back to all writing
                </Link>
              </div>

              <div className="pb-20" />
            </article>

            {/* ── Table of Contents ────────────────────── */}
            <aside className="hidden lg:block sticky top-24">
              <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-widest mb-4">
                On this page
              </p>
              <nav className="flex flex-col gap-1" aria-label="Table of contents">
                {post.toc.map((item) => (
                  <a
                    key={item.anchor}
                    href={`#${item.anchor}`}
                    className="text-sm text-ink-2 hover:text-ink py-1 transition-colors leading-snug"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
