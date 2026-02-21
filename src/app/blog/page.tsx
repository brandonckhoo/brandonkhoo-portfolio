import Image from "next/image";
import Link from "next/link";
import { siteContent, AmplitudeBlogPost } from "@/content/site";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Blog — Brandon Khoo",
  description: "Thought leadership on Data, Governance, and Product Management by Brandon Khoo.",
};

// ── All posts live here — add future posts to this array ──────────────────────
// Posts are shown newest-first. To add a new post from any publication,
// append an entry with source set to the publication name (e.g. "Substack").
const allPosts: AmplitudeBlogPost[] = siteContent.amplitudeBlog.posts;

const categoryColor: Record<AmplitudeBlogPost["category"], string> = {
  Product:  "#7c5cdb",
  Insights: "#7c5cdb",
};

export default function BlogPage() {
  return (
    <>
      <main className="min-h-screen bg-bg pt-20 pb-0">
        <div className="max-w-content mx-auto content-px">

          {/* Back link */}
          <div className="pt-10 pb-2">
            <Link
              href="/#blog"
              className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink transition-colors"
            >
              ← Back
            </Link>
          </div>

          {/* Header */}
          <div className="py-10 border-b border-border mb-10">
            <h1 className="font-display text-5xl sm:text-6xl text-ink mb-3">Blog</h1>
            <p className="text-ink-2 text-base">
              {allPosts.length} posts on Data, Governance, and Product Management.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-24">
            {allPosts.map((post, i) => (
              <BlogCard key={i} post={post} />
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

function BlogCard({ post }: { post: AmplitudeBlogPost }) {
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md hover:border-border-strong transition-all duration-200 h-full"
    >
      {/* Cover image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-subtle flex-shrink-0">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category + source */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: categoryColor[post.category] }}>
            {post.category}
          </span>
          {post.source && (
            <span className="text-xs text-ink-3">{post.source}</span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-ink leading-snug flex-1 group-hover:text-ink-2 transition-colors">
          {post.title}
        </h2>

        {/* Meta */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex items-center gap-1.5 text-xs text-ink-3">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M1 5h10" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M4 1v2M8 1v2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
            {post.date}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-ink-3">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {post.readTime}
          </div>
        </div>
      </div>
    </a>
  );
}
