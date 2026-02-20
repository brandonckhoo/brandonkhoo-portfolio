// Amplitude wordmark — hand-crafted SVG
// Amplitude's brand uses their wordmark with a distinctive "A" treatment
export default function AmplitudeLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Amplitude"
      role="img"
      className={className}
    >
      {/* Stylised "A" mark — ascending wave bars */}
      <rect x="0" y="14" width="4" height="10" rx="1.5" fill="currentColor" opacity="0.5" />
      <rect x="6" y="8"  width="4" height="16" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="12" y="2" width="4" height="22" rx="1.5" fill="currentColor" />
      <rect x="18" y="8"  width="4" height="16" rx="1.5" fill="currentColor" opacity="0.7" />
      <rect x="24" y="14" width="4" height="10" rx="1.5" fill="currentColor" opacity="0.5" />

      {/* Wordmark */}
      <text
        x="36"
        y="21"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="-0.3"
        fill="currentColor"
      >
        Amplitude
      </text>
    </svg>
  );
}
