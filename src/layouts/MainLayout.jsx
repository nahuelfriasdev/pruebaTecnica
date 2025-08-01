import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = () => {
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] min-h-screen bg-black text-white">
      <div className="border-r border-gray-800 p-4 flex justify-end">
        <Nav />
      </div>

      <main className="">
        <Outlet />
      </main>

      <div className="border-l border-gray-800 p-4">
        b
      </div>
    </div>
  );
};

export default Layout;