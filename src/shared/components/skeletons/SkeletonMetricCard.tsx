export function SkeletonMetricCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-7 w-16 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="h-11 w-11 shrink-0 animate-pulse rounded-lg bg-slate-200" />
      </div>
    </div> 
  );
} 