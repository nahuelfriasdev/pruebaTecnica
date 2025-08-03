import { useEffect } from "react";
import Post from "../../components/Post";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "../../store/usePostStore";
import deletePost from "../../services/deletePost";

export default function Home() {
  const { posts, fetchPosts } = usePostStore()
  const navigate = useNavigate();

    const handleDeletePost = async (postId) => {
      try {
        await deletePost(postId);
        fetchPosts()
      } catch (error) {
        console.error("Error al borrar el commentario:", error);
      }
    }

  useEffect(() => {
    fetchPosts()
  }, [])

  return(
    <>
      <section>
        {posts.map((post) => (
          <div className="cursor-pointer hover:bg-gray-700/10" onClick={() => navigate(`/post/${post.id}`)} key={post.id}>
            <Post key={post.id} text={post.content} username={post.name} date={post.createdAt} avatar={post.avatar} className="border border-gray-100/20" onDelete={() => handleDeletePost(post.id)}/>
          </div>
        ))}
      </section>
    </>
  )
}