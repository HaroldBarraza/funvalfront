import { Link } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export function PaginaSinAcceso() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
        <ShieldAlert size={32} />
      </div>

      <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
        Sin acceso
      </h1>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        Tu cuenta está activa, pero no tiene los permisos necesarios para ver
        esta sección. Si crees que es un error, contacta al administrador del
        sistema.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        <ArrowLeft size={16} />
        Volver al inicio
      </Link>
    </div>
  );
}
