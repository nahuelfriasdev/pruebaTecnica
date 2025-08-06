import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import { useState } from "react";
import createPost from "../../services/createPost";
import { usePostStore } from "../../store/usePostStore";
import { Loader2, Search } from "lucide-react";

export default function Post() {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const { addPost, user } = usePostStore()

  const handlePost = async () => {
    setLoading(true);
    try {
      const date = new Date();
      const newPost = await createPost(post, date, user);
      addPost(newPost)
      setLoading(false);
      setPost("");
    } catch (error) {
      console.error("Error al crear el post:", error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="text-center font-bold py-3">Para ti</div>
      {/* <section className="w-full flex justify-center">
        <div className="relative w-[80%] py-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Buscar"
            className="w-full pl-10 pr-4 py-2 border border-gray-100/20 rounded-full focus:outline-none bg-transparent text-white placeholder:text-gray-400"
          />
        </div>
      </section> */}


      <div className="px-10 py-3 border border-gray-100/20">
        <Textarea className="p-6 text-xl" placeholder="¿Qué estas pensando?" value={post} onChange={(e) => setPost(e.target.value)}/>
        <div className="flex justify-end mt-3 pt-3 border-t border-gray-100/20">
          <Button
            disabled={post.length === 0 || loading}
            text={loading ? <Loader2 className="animate-spin h-6 w-6 text-white" /> : "Postear"}
            className={`${post.length > 0 && !loading? "bg-white cursor-pointer" : ""}`}
            onClick={handlePost}
          />
        </div>
      </div>
    </>
  )
}