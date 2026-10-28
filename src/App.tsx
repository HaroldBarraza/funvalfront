import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/layout";
import { RutaProtegida } from "./components/rutaProtegida";
import LoginPage from "./pages/pagesLogin";
import { PaginaSinAcceso } from "./pages/paginasinAcceso";
import PaginaPacientes from "./pages/PaginaPacientes";
import PaginaDashboard from "./pages/dashboarpages";
import { DetallePaciente } from "./pages/PaginaDetallePaciente";
import { FormularioCita } from "./components/Formulariocitas";
import PaginaCitas from "./pages/citas";
import PaginaReportes from "./pages/PaginaReportes";
import { Paginanoencontrada } from "./pages/Pagenoencontrado";
import PaginaPerfil from "./components/PaginPerfil";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RutaProtegida />}>
        <Route element={<Layout />}>
          <Route index element={<PaginaDashboard />} />
          <Route path="/pacientes" element={<PaginaPacientes />} />
          <Route path="/pacientes/:id" element={<DetallePaciente />} />
          <Route path="/citas" element={<PaginaCitas />} />
          <Route path="/citas/nueva" element={<FormularioCita />} />
          <Route path="/perfil" element={<PaginaPerfil />} />
          <Route path="/sin-acceso" element={<PaginaSinAcceso />} />

          <Route element={<RutaProtegida rolesPermitidos={["GERENCIA"]} />}>
            <Route path="/reportes" element={<PaginaReportes />} />
          </Route>

          <Route path="*" element={<Paginanoencontrada />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;