export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl" role="status" aria-label="লোড হচ্ছে">
      <div className="skeleton mb-4 h-4 w-56" />
      <div className="surface flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="skeleton size-20 rounded-2xl" />
          <div className="space-y-2">
            <div className="skeleton h-8 w-52" />
            <div className="skeleton h-4 w-32" />
            <div className="skeleton h-4 w-64" />
          </div>
        </div>
        <div className="skeleton h-32 w-44 rounded-2xl" />
      </div>
      <div className="surface mt-5 p-6">
        <div className="skeleton h-6 w-40" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-24 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="surface mt-5 space-y-2 p-6">
        <div className="skeleton h-6 w-52" />
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="skeleton h-10 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
