import { notFound } from "next/navigation";
import Link from "next/link";
import { workCaseStudies } from "@/content/site";
import Tag from "@/components/ui/Tag";
import Footer from "@/components/sections/Footer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return workCaseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = workCaseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return { title: `${study.title} — Brandon Khoo` };
}

export default async function WorkCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = workCaseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <>
      <main className="pt-24 pb-0 bg-bg min-h-screen">
        {/* Back */}
        <div className="max-w-content mx-auto content-px mb-10">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition-colors"
          >
            ← Back to work
          </Link>
        </div>

        {/* Hero card */}
        <div className="max-w-content mx-auto content-px mb-16">
          <div
            className="rounded-3xl p-8 md:p-12 border border-border"
            style={{ background: "var(--gradient-hero-panel-subtle)" }}
          >
            <p className="text-xs font-medium text-ink-3 uppercase tracking-widest mb-3">
              {study.role} · {study.timeline}
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-ink mb-8 text-balance">
              {study.title}
            </h1>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {study.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-surface/80 backdrop-blur-sm rounded-2xl border border-border/60 px-5 py-4"
                >
                  <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-wider mb-1">
                    {m.label}
                  </p>
                  <p
                    className={
                      m.isPlaceholder
                        ? "text-base text-ink-3 italic font-medium"
                        : "text-xl font-semibold text-ink"
                    }
                  >
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <Tag key={s} label={s} />
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-[720px] mx-auto content-px">
          <CaseStudySection title="Context">
            <p className="text-base text-ink-2 leading-relaxed">{study.context}</p>
          </CaseStudySection>

          <CaseStudySection title="Problem">
            <p className="text-base text-ink-2 leading-relaxed">{study.problem}</p>
          </CaseStudySection>

          <CaseStudySection title="Approach">
            <ol className="flex flex-col gap-3 mt-1">
              {study.approach.map((step, i) => (
                <li key={i} className="flex gap-4 text-sm text-ink-2 leading-relaxed">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-border text-[11px] font-semibold flex items-center justify-center text-ink-3 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CaseStudySection>

          <CaseStudySection title="What I shipped">
            <ul className="flex flex-col gap-2.5 mt-1">
              {study.whatIShipped.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-2 leading-relaxed">
                  <span className="flex-shrink-0 text-[var(--color-accent-sage)] mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection title="Impact">
            <ul className="flex flex-col gap-2.5 mt-1">
              {study.impact.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-2 leading-relaxed">
                  <span className="flex-shrink-0 text-ink-3">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CaseStudySection>

          <CaseStudySection title="Learnings">
            <ul className="flex flex-col gap-3 mt-1">
              {study.learnings.map((item, i) => (
                <li key={i} className="text-sm text-ink-2 leading-relaxed pl-4 border-l-2 border-border">
                  {item}
                </li>
              ))}
            </ul>
          </CaseStudySection>

          {/* Tradeoff decision */}
          <CaseStudySection title="One key tradeoff">
            <div className="bg-surface rounded-2xl border border-border p-6 mt-2">
              <p className="text-xs font-semibold text-ink-3 uppercase tracking-wider mb-3">
                Decision
              </p>
              <p className="text-base font-medium text-ink mb-5">
                {study.tradeoff.decision}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-wider mb-1.5">
                    Rationale
                  </p>
                  <p className="text-sm text-ink-2 leading-relaxed">
                    {study.tradeoff.rationale}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-ink-3 uppercase tracking-wider mb-1.5">
                    The tradeoff
                  </p>
                  <p className="text-sm text-ink-2 leading-relaxed">
                    {study.tradeoff.tradeoff}
                  </p>
                </div>
              </div>
            </div>
          </CaseStudySection>

          {/* Metric definitions */}
          <CaseStudySection title="Metric definitions">
            <div className="flex flex-col gap-3 mt-2">
              {study.metricDefinitions.map((m) => (
                <div key={m.term} className="flex gap-4 text-sm">
                  <span className="font-semibold text-ink w-[180px] flex-shrink-0">
                    {m.term}
                  </span>
                  <span className="text-ink-2 leading-relaxed">{m.definition}</span>
                </div>
              ))}
            </div>
          </CaseStudySection>

          <div className="pb-20" />
        </div>
      </main>
      <Footer />
    </>
  );
}

function CaseStudySection({
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
