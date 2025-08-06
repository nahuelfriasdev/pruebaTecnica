import { useEffect } from "react"
import Post from "../../components/Post"
import { usePostStore } from "../../store/usePostStore"
import { Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import deletePost from "../../services/deletePost"
import editPost from "../../services/editPost"
import filterProfilePosts from "../../utils/filterProfilePosts"

export default function Profile () {
  const { posts, fetchPosts, loadingPost, user } = usePostStore()
  const navigate = useNavigate();

  const profilePost = filterProfilePosts(posts, user);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      fetchPosts()
    } catch (error) {
      console.error("Error al borrar el post:", error);
    }
  }

  const handleEditPost = async (post, postId) => {
    try {
      const date = new Date();
      await editPost(post, date, postId);
      fetchPosts()
    } catch (error) {
      console.error("Error al editar el post:", error);
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return(
    <>
      <section>
        {loadingPost && (
          <div className="flex justify-center mt-10">
            <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
          </div>
        )}
        {profilePost.map((post) => (
          <div className="cursor-pointer hover:bg-gray-700/10" onClick={() => navigate(`/post/${post.id}`)} key={post.id}>
            <Post key={post.id} text={post.content} username={post.name} date={post.createdAt} avatar={post.avatar} className="border border-gray-100/20" onDelete={() => handleDeletePost(post.id)} onEdit={(updatedText) => handleEditPost(updatedText,post.id)}/>
          </div>
        ))}
      </section>
    </>
  )
}