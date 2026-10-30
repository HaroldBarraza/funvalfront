export function SkeletonPacienteRow() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-slate-200" />

        <div className="w-48 shrink-0">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          <div className="mt-1.5 h-3 w-24 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="flex-1">
          <div className="h-3.5 w-48 animate-pulse rounded bg-slate-200" />
          <div className="mt-1.5 h-3.5 w-32 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="hidden w-28 shrink-0 md:block">
          <div className="ml-auto h-5 w-16 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
        <div className="h-7 w-20 animate-pulse rounded-lg bg-slate-200" />
        <div className="ml-auto h-7 w-28 animate-pulse rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}