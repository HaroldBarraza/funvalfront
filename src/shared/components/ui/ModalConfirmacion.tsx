import { useEffect } from "react";

interface ModalConfirmacionProps {
  abierto: boolean;
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  cargando?: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
} 

export const ModalConfirmacion = ({
  abierto,
  titulo,
  mensaje,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  cargando = false,
  onConfirmar,
  onCancelar,
}: ModalConfirmacionProps) => {
  useEffect(() => {
    if (!abierto) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !cargando) onCancelar();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [abierto, cargando, onCancelar]);

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
      onClick={() => !cargando && onCancelar()}
    >
      <div
        className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-slate-900">{titulo}</h2>
        <p className="mt-2 text-sm text-slate-600">{mensaje}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            disabled={cargando}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {textoCancelar}
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            disabled={cargando}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cargando ? "Eliminando..." : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
};