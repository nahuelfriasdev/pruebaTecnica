import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../components/Post";
import { ArrowLeft, Loader2, MessageCircle } from "lucide-react";
import { usePostStore } from "../../store/usePostStore";
import Textarea from "../../components/Textarea";
import Button from "../../components/Button";
import createComment from "../../services/createComment";
import deleteComment from "../../services/deleteComment";
import editComment from "../../services/editComment";
import CommentThread from "../../components/CommentThread";
import organizeComments from "../../utils/organizeComments";


export default function SinglePost () {
  const { post, fetchSinglePost, comments, fetchComments, addComent, loadingPost } = usePostStore()
  const [mainReplyText, setMainReplyText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [loading, setLoading] = useState(false);

  const postId = useParams().id;
  const navigate = useNavigate();
  const organizedComments = useMemo(() => organizeComments(comments), [comments]);

  const handleComment = async (parentId = null) => {
    setLoading(true);
    try {
      const replyTextToUse = parentId ? replyText : mainReplyText;
      if (!replyTextToUse.trim()) return;
      const date = new Date();
      const newReplyText= await createComment(replyTextToUse, date, postId, parentId);
      addComent(newReplyText)
      setLoading(false);
      setActiveReplyId(null);
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
    } finally {
      setLoading(false);
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
  },[postId])

  return (
    <>
      <div className="flex items-center gap-x-4 p-4">
        <button type="button" className="hover:bg-gray-400/30 hover:rounded-full p-2" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <p className="font-bold text-xl">Post</p>
      </div>
      {loadingPost 
        ? <div className="flex justify-center mt-10">
            <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
          </div>

        : <>
          <Post text={post.content} username={post.name} date={post.createdAt} avatar={post.avatar} className="border border-gray-100/20"/>

          <div className="px-5 py-2 text-lg border-b border-gray-100/20">
            <Textarea className="h-8" placeholder="Postea tu respuesta" value={mainReplyText} onChange={(e) => {
              setMainReplyText(e.target.value)
              setActiveReplyId(null);
              }}/>
            <div className="flex justify-end mt-3 pt-3 border-t border-gray-100/20">
              <Button className={`${mainReplyText.length > 0 ? "bg-white cursor-pointer" : ""}  px-2 py-2 text-sm`} text={loading ? <Loader2 className="animate-spin h-6 w-6 text-white" /> : "Responder"} onClick={() => {
                handleComment()
                setMainReplyText("");
              }}/>
            </div>
          </div>
        </>
      }
      

      {organizedComments.map((comment) => (
          <CommentThread
              key={comment.id}
              comment={comment}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              replyText={replyText}
              setReplyText={setReplyText}
              handleComment={handleComment}
              handleDeleteComment={handleDeleteComment}
              handleEditComment={handleEditComment}
              loading={loading}
              postId={post.id}
            />
      ))}
    </>
  )
}