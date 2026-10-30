export function SkeletonCitaRow() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-14 animate-pulse rounded-full bg-slate-200" />
          </div>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="mt-2 h-3.5 w-3/4 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="h-9 w-28 shrink-0 animate-pulse rounded-lg bg-slate-200" />
      </div>
    </div> 
  );
}