import { Routes, Route} from "react-router-dom";
import { Layout } from "./layouts/layout";
import { ProtecRoute } from "./components/ProtectRoute";
import LoginPage from "./pages/pagesLogin";
import PaginaPacientes from "./pages/PaginaPacientes";
import PaginaDashboard from "./pages/dashboarpages";
import { DetallePaciente } from "./pages/PaginaDetallePaciente";
import { FormularioCita } from "./components/Formulariocitas";
import PaginaCitas from "./pages/citas";
import PaginaReportes from "./pages/PaginaReportes";
import { Paginanoencontrada } from "./pages/Pagenoencontrado";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
          <ProtecRoute>
            <Layout />
          </ProtecRoute>
        }
      >
        <Route path="/" element={<PaginaDashboard />} />
        <Route path="/pacientes" element={<PaginaPacientes />} />
        <Route path="/pacientes/:id" element={<DetallePaciente />} />
        <Route path="/citas" element={<PaginaCitas />} />
        <Route path="/citas/nueva" element={<FormularioCita />} />
        <Route path="/reportes" element={<PaginaReportes />} />
        <Route path="*" element={<Paginanoencontrada />} />
      </Route>
    </Routes>
  );
}

export default App;