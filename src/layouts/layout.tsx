import { Outlet } from "react-router-dom";
import { Nav } from "../components/navbar";

export const Layout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Nav />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
};