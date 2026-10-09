export default function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-sm ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="size-[55%]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 4h2.6l2.2 10.2h9.6l2-7.4H6.4" />
        <circle cx="9.2" cy="18.8" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="16.6" cy="18.8" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}
