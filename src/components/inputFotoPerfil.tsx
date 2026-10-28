import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  fotoactual?: string | null;
  inicialies: string;
  onChange: (file: File | undefined) => void;
}

export function InputFotoPerfil({ fotoactual, inicialies, onChange }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Selecciona una imagen válida (JPG, PNG, etc.)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen debe ser menor a 5 MB");
      return;
    }

    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const quitarSeleccion = () => {
    setPreview(null);
    onChange(undefined);
  };

  const imagenMostrada = preview ?? fotoactual;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-full border-2 border-slate-200 bg-blue-50 text-2xl font-bold text-blue-600">
          {imagenMostrada ? (
            <img
              src={imagenMostrada}
              alt="Foto de perfil"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{inicialies}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute -bottom-1 -right-1 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
          title="Cambiar foto"
        >
          <Camera size={14} />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {preview ? (
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-slate-500">
            Nueva foto lista para guardar
          </span>
          <button
            type="button"
            onClick={quitarSeleccion}
            className="text-xs font-semibold text-rose-600 hover:underline"
          >
            Quitar selección
          </button>
        </div>
      ) : (
        <span className="text-xs text-slate-500">JPG o PNG · máx. 5 MB</span>
      )}
    </div>
  );
}