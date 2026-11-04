import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { RutaProtegida } from "./components/rutaProtegida";
import { ErrorBoundary } from "./shared/components/ui/ErrorBoundary";
import { AlertaBanner } from "./shared/components/ui/AlertaBanner";
import { Spinner } from "./shared/components/ui/Spinner";
import LoginPage from "./pages/pagesLogin";
import PaginaDashboard from "./pages/dashboarpages";
import "./App.css";

const PaginaPacientes = lazy(() => import("./pages/PaginaPacientes"));
const PaginaCitas = lazy(() => import("./pages/citas"));
const PaginaHistorialCitas = lazy(() => import("./pages/PaginaHistorialCitas"));
const PaginaReportes = lazy(() => import("./pages/PaginaReportes"));
const PaginaPerfil = lazy(() => import("./components/PaginPerfil"));

const DetallePaciente = lazy(() =>
  import("./pages/PaginaDetallePaciente").then((m) => ({
    default: m.DetallePaciente,
  })),
);
const FormularioCita = lazy(() =>
  import("./components/Formulariocitas").then((m) => ({
    default: m.FormularioCita,
  })),
);
const PaginaSinAcceso = lazy(() =>
  import("./pages/paginasinAcceso").then((m) => ({
    default: m.PaginaSinAcceso,
  })),
);
const Paginanoencontrada = lazy(() =>
  import("./pages/Pagenoencontrado").then((m) => ({
    default: m.Paginanoencontrada,
  })),
);

function App() {
  return (
    <Suspense fallback={<Spinner fullscreen label="Cargando..." />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RutaProtegida />}>
          <Route element={<Layout />}>
            <Route index element={<PaginaDashboard />} />
            <Route path="/pacientes" element={<PaginaPacientes />} />
            <Route path="/pacientes/:id" element={<DetallePaciente />} />
            <Route path="/citas" element={<PaginaCitas />} />

            <Route
              path="/citas/historial"
              element={
                <ErrorBoundary
                  fallback={
                    <AlertaBanner
                      tipo="error"
                      mensaje="Error al cargar el historial"
                      descripcion="Recarga la página o intenta de nuevo más tarde."
                    />
                  }
                >
                  <PaginaHistorialCitas />
                </ErrorBoundary>
              }
            />

            <Route path="/citas/nueva" element={<FormularioCita />} />
            <Route path="/perfil" element={<PaginaPerfil />} />
            <Route path="/sin-acceso" element={<PaginaSinAcceso />} />

            <Route element={<RutaProtegida rolesPermitidos={["GERENCIA"]} />}>
              <Route
                path="/reportes"
                element={
                  <ErrorBoundary
                    fallback={
                      <AlertaBanner
                        tipo="error"
                        mensaje="Error al cargar los reportes"
                        descripcion="Las gráficas no pudieron renderizarse."
                      />
                    }
                  >
                    <PaginaReportes />
                  </ErrorBoundary>
                }
              />
            </Route>

            <Route path="*" element={<Paginanoencontrada />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
