"use client";

import { useState } from "react";
import { siteContent } from "@/content/site";
import Section, { SectionHeader } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import FadeUp from "@/components/ui/FadeUp";

const { contact } = siteContent;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens default mail client as fallback (no backend required)
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  return (
    <Section id="contact" subtle>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <FadeUp>
          <SectionHeader title={contact.title} className="mb-4" />
          <p className="text-ink-2 text-base mb-8">{contact.availability}</p>

          {/* Direct links */}
          <div className="flex flex-wrap gap-3">
            {contact.links.map((link) => (
              <ButtonLink
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                variant={link.label === "Book a call" ? "primary" : "secondary"}
                size="md"
              >
                {link.label}
                {link.label !== "Email" && (
                  <span className="ml-1.5 opacity-50 text-xs">↗</span>
                )}
              </ButtonLink>
            ))}
          </div>
        </FadeUp>

        {/* Right: Contact form */}
        <FadeUp delay={0.1}>
          {submitted ? (
            <div className="flex flex-col items-start gap-3 py-10">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent-sage)] flex items-center justify-center text-ink text-lg">
                ✓
              </div>
              <p className="font-semibold text-ink">Your mail client opened.</p>
              <p className="text-sm text-ink-2">
                Send that email and I&apos;ll get back to you within 48 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-ink-2 hover:text-ink underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-ink-2 uppercase tracking-wider mb-1.5"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-border-strong transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-ink-2 uppercase tracking-wider mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-border-strong transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-ink-2 uppercase tracking-wider mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, message: e.target.value }))
                  }
                  placeholder="What's on your mind?"
                  className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-border-strong transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="self-start px-6 py-3 bg-ink text-white rounded-pill text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer min-h-[44px] active:scale-[0.98]"
              >
                Send message →
              </button>
            </form>
          )}
        </FadeUp>
      </div>
    </Section>
  );
}
