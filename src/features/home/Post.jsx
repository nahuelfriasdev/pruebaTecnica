import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import { useState } from "react";
import createPost from "../../services/createPost";
import { usePostStore } from "../../store/usePostStore";

export default function Post() {
  const [post, setPost] = useState("");
  const { addPost } = usePostStore()

  const handlePost = async () => {
    try {
      const date = new Date();
      const newPost = await createPost(post, date);
      addPost(newPost)
      setPost("");
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  }

  return (
    <>
      <div className="p-4 border border-gray-800">
        <Textarea className="p-6 text-xl" placeholder="¿Qué estas pensando?" value={post} onChange={(e) => setPost(e.target.value)}/>
          <div className="flex justify-end mt-3 pt-3 border-t border-gray-100/20">
            <Button
              disabled={post.length === 0}
              text="Postear"
              className={`${post.length > 0 ? "bg-white" : ""}`}
              onClick={handlePost}
            />
          </div>
      </div>
    </>
  )
}