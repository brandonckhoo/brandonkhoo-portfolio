import { notFound } from "next/navigation";
import Link from "next/link";
import { sideProjectDetails } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import Footer from "@/components/sections/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return sideProjectDetails.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = sideProjectDetails.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} — Brandon Khoo` };
}

const typeColors: Record<string, string> = {
  prototype: "var(--color-accent-blush)",
  game: "var(--color-accent-sage)",
  demo: "var(--color-accent-lavender)",
};

const typeLabel: Record<string, string> = {
  prototype: "Prototype",
  game: "Game",
  demo: "Demo",
};

export default async function SideProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = sideProjectDetails.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <main className="pt-24 bg-bg min-h-screen">
        {/* Back */}
        <div className="max-w-content mx-auto content-px mb-10">
          <Link
            href="/#side-projects"
            className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors"
          >
            ← Back to side projects
          </Link>
        </div>

        {/* Hero */}
        <div className="max-w-content mx-auto content-px mb-16">
          <div
            className="rounded-3xl p-8 md:p-12 border border-border"
            style={{
              background: `linear-gradient(135deg, ${typeColors[project.type]}22, transparent 70%)`,
              borderColor: `${typeColors[project.type]}44`,
            }}
          >
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-pill border mb-4"
              style={{
                background: typeColors[project.type] + "33",
                borderColor: typeColors[project.type] + "66",
                color: "var(--color-text)",
              }}
            >
              {typeLabel[project.type]}
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-ink mb-4 text-balance">
              {project.title}
            </h1>
            <p className="text-lg text-ink-2 max-w-[580px] mb-8">
              {project.oneliner}
            </p>

            {/* External links */}
            {project.links && project.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <ButtonLink
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={link.primary ? "primary" : "secondary"}
                    size="md"
                  >
                    {link.label}
                    <span className="ml-1.5 opacity-60">↗</span>
                  </ButtonLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="max-w-[720px] mx-auto content-px">
          {/* Alice: Product rationale */}
          {project.productRationale && (
            <DetailSection title="Product rationale for account-based workflows">
              <div className="bg-surface rounded-2xl border border-border p-6 mt-2">
                <p className="text-sm text-ink-2 leading-relaxed">
                  {project.productRationale}
                </p>
              </div>
            </DetailSection>
          )}

          <DetailSection title="What I built">
            <p className="text-base text-ink-2 leading-relaxed">{project.whatIBuilt}</p>
          </DetailSection>

          <DetailSection title="Why it matters">
            <p className="text-base text-ink-2 leading-relaxed">{project.whyItMatters}</p>
          </DetailSection>

          <DetailSection title="How it works">
            <ol className="flex flex-col gap-3 mt-1">
              {project.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-4 text-sm text-ink-2 leading-relaxed">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border text-[11px] font-semibold flex items-center justify-center text-ink-3 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </DetailSection>

          {/* Demo scenarios (Cosmo) */}
          {project.demoScenarios && (
            <DetailSection title="Demo scenarios">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                {project.demoScenarios.map((s) => (
                  <div
                    key={s.label}
                    className="px-4 py-4 rounded-2xl bg-surface border border-border"
                  >
                    <p className="text-sm font-semibold text-ink mb-1">
                      {s.label}
                    </p>
                    <p className="text-xs text-ink-2 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </DetailSection>
          )}

          {/* Alice demonstrates / trust */}
          {project.demonstrates && (
            <DetailSection title="What it demonstrates">
              <ul className="flex flex-col gap-2 mt-1">
                {project.demonstrates.map((d, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-2">
                    <span className="text-[var(--color-accent-sage)] mt-0.5 flex-shrink-0">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}

          {project.trustAndControl && (
            <DetailSection title="Trust and control">
              <ul className="flex flex-col gap-2 mt-1">
                {project.trustAndControl.map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-2">
                    <span className="text-ink-3 mt-0.5 flex-shrink-0">·</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </DetailSection>
          )}

          {/* Build steps (Space Shooter) */}
          {project.steps && (
            <DetailSection title="How it was built">
              <ol className="flex flex-col gap-3 mt-1">
                {project.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 text-sm text-ink-2 leading-relaxed">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border text-[11px] font-semibold flex items-center justify-center text-ink-3 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </DetailSection>
          )}

          <DetailSection title="Stack and tools">
            <div className="flex flex-wrap gap-2 mt-2">
              {project.stack.map((s) => (
                <Tag key={s} label={s} />
              ))}
            </div>
            {project.callout && (
              <p className="text-sm text-ink-2 mt-4 pl-4 border-l-2 border-border">
                {project.callout}
              </p>
            )}
          </DetailSection>

          <DetailSection title="What I'd improve next">
            <ul className="flex flex-col gap-2 mt-1">
              {project.improvements.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-2">
                  <span className="text-ink-3 mt-0.5 flex-shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <div className="pb-20" />
        </div>
      </main>
      <Footer />
    </>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12 pb-12 border-b border-border last:border-0">
      <h2 className="font-display text-2xl text-ink mb-4">{title}</h2>
      {children}
    </div>
  );
}
