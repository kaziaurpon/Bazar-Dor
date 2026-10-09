/** Original illustration: a basket full of fresh produce. */
export default function HeroIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 300" className={className} role="img" aria-label="তাজা সবজি ও ফলে ভরা ঝুড়ি">
      <ellipse cx="180" cy="278" rx="120" ry="12" fill="#0f172a" opacity="0.08" />
      {/* produce */}
      <ellipse cx="238" cy="122" rx="30" ry="40" fill="#7c3aed" transform="rotate(18 238 122)" />
      <path d="M244 84c6-12 16-16 24-14-2 10-10 18-24 14Z" fill="#15803d" />
      <circle cx="178" cy="92" r="44" fill="#22a24f" />
      <path d="M178 50c-10 18-10 66 0 84M150 62c14 20 14 56 0 76M206 62c-14 20-14 56 0 76" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.65" />
      <circle cx="116" cy="130" r="38" fill="#e23b3b" />
      <path d="M116 94c-2-10 4-18 14-22 2 10-4 20-14 22Z" fill="#15803d" />
      <ellipse cx="104" cy="118" rx="9" ry="14" fill="#fff" opacity="0.28" transform="rotate(25 104 118)" />
      <circle cx="262" cy="170" r="30" fill="#f59e0b" />
      <ellipse cx="253" cy="160" rx="7" ry="10" fill="#fff" opacity="0.3" transform="rotate(25 253 160)" />
      <circle cx="82" cy="176" r="24" fill="#fb923c" />
      <circle cx="178" cy="168" r="30" fill="#b45309" opacity="0.0" />
      <ellipse cx="178" cy="150" rx="26" ry="22" fill="#facc15" />
      {/* basket */}
      <path d="M40 160h280l-26 100c-3 11-13 18-24 18H90c-11 0-21-7-24-18Z" fill="#c47a35" />
      <path d="M40 160h280l-4 14H44Z" fill="#a8621f" />
      <g stroke="#8a4f17" strokeWidth="3" opacity="0.55" fill="none" strokeLinecap="round">
        <path d="M70 188h220M76 214h208M84 240h192" />
        <path d="M110 176v94M150 176v100M190 176v100M230 176v100M270 176v94" />
      </g>
      <rect x="34" y="152" width="292" height="14" rx="7" fill="#d98c42" />
    </svg>
  );
}
