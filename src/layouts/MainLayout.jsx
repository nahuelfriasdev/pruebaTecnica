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
    <div className="min-h-screen bg-black text-white grid grid-cols-[0.2fr_1.25fr] md:grid-cols-[0.5fr_1.25fr_1.25fr] lg:grid-cols-[1.25fr_1fr_1.25fr]">
      <section className="border-r border-gray-100/20 p-4 flex flex-col items-end gap-y-5 overflow-y-auto">
        <Nav />
      </section>

      <main className="overflow-y-auto min-h-screen">
        <Outlet />
      </main>

      <section className="border-l border-gray-100/20 p-4 overflow-y-auto hidden md:block">
        <article className="space-y-4">
          <h3 className="text-lg font-semibold">Trending</h3>
          <div className="space-y-2">
            {trending.map((trend, index) => (
              <div key={index} className="p-3">
                <p className="font-medium">#{index + 1} {trend.topic}</p>
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