interface SpinnerProps {
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-10 w-10 border-4",
}; 

export function Spinner({ fullscreen = false, size = "md", label }: SpinnerProps) {
  const spinner = (
    <div
      className={`animate-spin rounded-full border-slate-200 border-t-blue-600 ${sizeMap[size]}`}
      role="status"
      aria-label={label ?? "Cargando"}
    />
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-white/60 backdrop-blur-sm">
        {spinner}
        {label && <p className="text-sm text-slate-500">{label}</p>}
      </div>
    );
  }

  return spinner;
}