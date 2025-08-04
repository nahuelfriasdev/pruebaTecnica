import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../components/Post";
import { ArrowLeft } from "lucide-react";
import { usePostStore } from "../../store/usePostStore";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import createComment from "../../services/createComment";
import deleteComment from "../../services/deleteComment";
import editComment from "../../services/editComment";


export default function SinglePost () {
  const { post, fetchSinglePost, comments, fetchComments, addComent } = usePostStore()
  const [comment, setComment] = useState("");

  const postId = useParams().id;
  const navigate = useNavigate();

  const handleComment = async (parentId) => {
    try {
      const date = new Date();
      const newComment = await createComment(comment, date, postId, parentId);
      addComent(newComment)
      setComment("");
    } catch (error) {
      console.error("Error al crear el post:", error);
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(postId, commentId);
      fetchComments(postId)
    } catch (error) {
      console.error("Error al borrar el comentario:", error);
    }
  }

  const handleEditComment = async (comment, postId,commentId) => {
    try {
      const date = new Date();
      await editComment(comment, date, postId,commentId);
      fetchComments(postId);
    } catch (error) {
      console.error("Error al editar el comentario:", error);
    }
  }

  useEffect(()=> {
    fetchSinglePost(postId);
    fetchComments(postId);
    console.log(comments);
  },[])

  return (
    <>
      <div className="flex items-center gap-x-4 p-4">
        <button type="button" className="hover:bg-gray-400/30 hover:rounded-full p-2" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <p className="font-bold text-xl">Post</p>
      </div>
      <Post key={post.id} text={post.content} username={post.name} date={post.createdAt} avatar={post.avatar} className="border border-gray-100/20"/>
      <div className="px-5 py-2 text-lg border-b border-gray-100/20">
        <Textarea className="h-8" placeholder="Postea tu respuesta" value={comment} onChange={(e) => setComment(e.target.value)}/>
        <div className="flex justify-end mt-3 pt-3 border-t border-gray-100/20">
          <Button className={`${comment.length > 0 ? "bg-white cursor-pointer" : ""}  px-2 py-2 text-sm`} text="Responder" onClick={() => handleComment()}/>
        </div>
      </div>
      {comments.map((comment) => (
        <>
          <Post key={comment.id} text={comment.content} username={comment.name} date={comment.createdAt} avatar={comment.avatar} className={`${comment.parentId ? "" : "border-t border-gray-100/20"}`} onDelete={() => handleDeleteComment(comment.id)} onEdit={(updatedText) => handleEditComment(updatedText,post.id,comment.id)}/>
        </>
      ))}
    </>
  )
}