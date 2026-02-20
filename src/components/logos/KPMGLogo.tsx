// KPMG wordmark — hand-crafted SVG matching KPMG brand style
// Brand color: #00338D (dark blue), displayed in current color for theming
export default function KPMGLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="KPMG"
      role="img"
      className={className}
    >
      {/* Four coloured squares — simplified KPMG brand mark */}
      <rect x="0"  y="4"  width="8" height="8" rx="1" fill="currentColor" opacity="0.9" />
      <rect x="10" y="4"  width="8" height="8" rx="1" fill="currentColor" opacity="0.7" />
      <rect x="0"  y="14" width="8" height="8" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="10" y="14" width="8" height="8" rx="1" fill="currentColor" opacity="0.3" />

      {/* Wordmark */}
      <text
        x="24"
        y="21"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="16"
        fontWeight="700"
        letterSpacing="1.5"
        fill="currentColor"
      >
        KPMG
      </text>
    </svg>
  );
}
