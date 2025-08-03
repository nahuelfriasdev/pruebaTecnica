import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed left-0 top-0 h-screen w-[calc(100vw*1.25/3.65)] border-r border-gray-100/20 p-4 flex flex-col items-end gap-y-5 overflow-y-auto">
        <Nav />
      </div>

      <main className="overflow-y-auto min-h-screen main-margins">
        <Outlet />
      </main>

      <div className="fixed right-0 top-0 h-screen w-[calc(100vw*1.25/3.65)] border-l border-gray-100/20 p-4 overflow-y-auto">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Trending</h3>
          <div className="space-y-2">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="p-3 hover:bg-gray-800 rounded cursor-pointer">
                <div className="font-medium">Trending Topic {i + 1}</div>
                <div className="text-sm text-gray-400">123K posts</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;