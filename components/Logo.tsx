export default function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl bg-primary shadow-sm ${className}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-icon.png" alt="" width={18} height={18} className="size-[48%] brightness-0 invert" />
    </span>
  );
}
