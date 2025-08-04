import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = () => {
  return (
    <div className="grid grid-cols-[1.25fr_1fr_1.25fr] min-h-screen bg-black text-white">
      <div className="border-r border-gray-800 p-4 flex flex-col items-end gap-y-5">
        <Nav />
      </div>

      <main>
        <Outlet />
      </main>

      <div className="border-l border-gray-800 p-4">
        b
      </div>
    </div>
  );
};

export default Layout;