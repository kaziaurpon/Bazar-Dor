export default function SectionHeading({
  id,
  title,
  subtitle,
  marker,
  markerClass = "",
}: {
  id?: string;
  title: string;
  subtitle?: string;
  marker?: string;
  markerClass?: string;
}) {
  return (
    <div className="mb-4">
      <h2 id={id} className="flex items-center gap-2 text-lg font-bold text-base-content sm:text-xl">
        {marker && (
          <span className={`text-sm ${markerClass}`} aria-hidden="true">
            {marker}
          </span>
        )}
        {title}
      </h2>
      {subtitle && <p className="mt-0.5 text-sm text-base-content/60">{subtitle}</p>}
    </div>
  );
}
