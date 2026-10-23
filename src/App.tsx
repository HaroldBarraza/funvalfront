import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/layout";
import PaginaPacientes from "./pages/PaginaPacientes";
import PaginaDashboard from "./pages/dashboarpages";
import { DetallePaciente } from "./pages/PaginaDetallePaciente";
import { FormularioCita } from "./components/Formulariocitas";
import { Paginanoencontrada } from "./pages/Pagenoencontrado";
import PaginaReportes from "./pages/PaginaReportes";
import PaginaCitas from "./pages/citas";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<PaginaDashboard />} />
        <Route path="/pacientes" element={<PaginaPacientes />} />
        <Route path="/pacientes/:id" element={<DetallePaciente />} />
        <Route path="/citas/nueva" element={<FormularioCita />} />
        <Route path="/citas" element={<PaginaCitas />} />
        <Route path="/reportes" element={<PaginaReportes />} />
        <Route path="*" element={<Paginanoencontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
