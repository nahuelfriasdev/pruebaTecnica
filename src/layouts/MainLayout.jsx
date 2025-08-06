import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout = () => {

const trending = [
  { topic: "IA Generativa", countPost: "42" },
  { topic: "Computación cuántica", countPost: "34" },
  { topic: "Viajes a Marte", countPost: "27" },
  { topic: "Tecnología vestible", countPost: "25" },
  { topic: "Deepfakes", countPost: "21" },
  { topic: "Neurotecnología", countPost: "19" },
  { topic: "Hackers éticos", countPost: "16" },
  { topic: "Chatbots conscientes", countPost: "12" },
  { topic: "Implantes cerebrales", countPost: "9" },
  { topic: "Cerebros artificiales", countPost: "8" },
];



  return (
    <div className="min-h-screen bg-black text-white">
      <section className="fixed left-0 top-0 h-screen w-[calc(100vw*1.25/3.65)] border-r border-gray-100/20 p-4 flex flex-col items-end gap-y-5 overflow-y-auto">
        <Nav />
      </section>

      <main className="overflow-y-auto min-h-screen main-margins">
        <Outlet />
      </main>

      <section className="fixed right-0 top-0 h-screen w-[calc(100vw*1.25/3.65)] border-l border-gray-100/20 p-4 overflow-y-auto">
        <article className="space-y-4">
          <h3 className="text-lg font-semibold">Trending</h3>
          <div className="space-y-2">
            {trending.map((trend, index) => (
              <div key={index} className="p-3">
                <p className="font-medium"> #{index + 1} {trend.topic}</p>
                <p className="text-sm text-gray-400">{trend.countPost}K posts</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Layout;