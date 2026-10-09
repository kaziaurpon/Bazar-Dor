import { changeText, changeTone, formatPct } from "@/lib/format";
import type { ChangeDir } from "@/lib/types";

export default function ChangeBadge({
  dir,
  pct,
  className = "",
}: {
  dir: ChangeDir;
  pct: number;
  className?: string;
}) {
  const tone = changeTone(dir);
  const label =
    dir === "up"
      ? `দাম বেড়েছে ${formatPct(pct)}`
      : dir === "down"
        ? `দাম কমেছে ${formatPct(pct)}`
        : "দামে কোনো পরিবর্তন নেই";
  return (
    <span
      title={label}
      aria-label={label}
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${tone.badge} ${className}`}
    >
      <span aria-hidden="true">{changeText(dir, pct)}</span>
    </span>
  );
}
