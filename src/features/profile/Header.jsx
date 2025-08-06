import { ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import filterProfilePosts from "../../utils/filterProfilePosts";
import { usePostStore } from "../../store/usePostStore";

export default function Header() {
  const { posts, user } = usePostStore()

  const navigate = useNavigate();

  const profilePost = filterProfilePosts(posts, user);
  const amountPost = profilePost.length;

  const userData = {
    name: user.name,
    username: user.username,
    birth: user.birth,
    joined: user.joined,
    following: user.following,
    followers: user.followers,
    posts: amountPost
  };

  
  return (
    <>
      <div className="flex items-center gap-x-4 p-4">
        <button
          type="button"
          className="hover:bg-gray-400/30 hover:rounded-full p-2"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div>
          <p className="font-bold text-white text-xl flex items-center gap-1">
            {userData.name} <Lock className="w-4 h-4" />
          </p>
          <p className="text-sm text-gray-400">{userData.posts} posts</p>
        </div>
      </div>

      <section className="relative border-b border-gray-100/20">
        <div className="bg-gray-700 w-full h-[200px]" />

        <div className="absolute left-4 top-[150px]">
          <img src="https://i.pravatar.cc/150?img=11" alt="profile photo" className="w-[100px] h-[100px] rounded-full border-4 border-black" />
        </div>

        <div className="flex justify-end px-4 pt-4">
          <button className="border border-gray-100/20 px-4 py-1 rounded-full text-white hover:bg-white/10">
            Editar perfil
          </button>
        </div>

        <div className="pt-4 px-4 text-white">
          <p className="font-bold text-xl flex items-center gap-1">
            {userData.name} <Lock className="w-4 h-4" />
          </p>
          <p className="text-gray-400">@{userData.username}</p>

          <div className="flex items-center gap-4 text-gray-400 text-sm mt-2 flex-wrap">
            <span>🎂 Fecha de nacimiento: {userData.birth}</span>
            <span>📅 Se unió el {userData.joined}</span>
          </div>

          <div className="flex gap-4 text-sm mt-2 text-white">
            <span>
              <strong>{userData.following}</strong> Siguiendo
            </span>
            <span>
              <strong>{userData.followers}</strong> Seguidores
            </span>
          </div>
        </div>

        <div className="mt-4 border-b border-gray-100/20">
          <nav className="flex justify-around text-sm font-semibold text-gray-400">
            {["Posts", "Respuestas", "Destacados", "Artículos", "Multimedia", "Me gusta"].map((tab, index) => (
              <button
                key={index}
                className={`py-3 px-2 hover:bg-gray-100/10 ${
                  tab === "Posts" ? "border-b-2 border-blue-500 text-white" : ""
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
