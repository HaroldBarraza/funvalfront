import { Link } from "react-router-dom";

export const Paginanoencontrada = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl">🔍</p>

      <h1 className="mt-4 text-6xl font-bold tracking-tight text-slate-900">
        404
      </h1>

      <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
        La página que buscas no existe. Puede que el enlace esté roto o que
        hayas escrito mal la URL.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Ir al inicio
      </Link>
    </div>
  );
};