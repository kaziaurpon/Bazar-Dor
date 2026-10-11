/**
 * Logo mark from the Figma: a green rounded square with the 🛒 emoji.
 * The emoji is a vector glyph, so it stays sharp on every screen (the old 18×18 px PNG got blurry).
 */
export default function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-xl bg-primary ${className}`}
      aria-hidden="true"
    >
      <span className="text-[18px] leading-none brightness-0 invert">🛒</span>
    </span>
  );
}