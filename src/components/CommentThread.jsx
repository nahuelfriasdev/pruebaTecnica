import Post from "./Post";
import { MessageCircle, Loader2 } from "lucide-react";
import Textarea from "./Textarea";
import Button from "./Button";

export default function CommentThread({ comment, activeReplyId, setActiveReplyId, replyText, setReplyText, handleComment, handleDeleteComment, handleEditComment, loading, postId }) {
  const isReplying = activeReplyId === comment.id;

  return (
    <div className={`${comment.parentId ? "relative ml-6 pl-4" : ""}`}>
      {comment.parentId && (
        <div className="absolute left-0 top-0 h-12 border-l border-gray-400/40"></div>
      )}

      <Post
        key={comment.id}
        text={comment.content}
        username={comment.name}
        date={comment.createdAt}
        avatar={comment.avatar}
        onDelete={() => handleDeleteComment(comment.id)}
        onEdit={(updatedText) => handleEditComment(updatedText, postId, comment.id)}
      />

      <div
        className={`flex gap-x-2 items-center px-5 py-2 text-sm text-gray-500 cursor-pointer select-none ${
          activeReplyId || comment.replies.length > 0 ? "" : "border-b border-gray-100/20"
        }`}
        onClick={() =>
          setActiveReplyId(activeReplyId === comment.id ? null : comment.id)
        }
      >
        <MessageCircle size={14} />
        <span>Responder a {comment.name}</span>
      </div>

      {isReplying && (
        <div className="px-5 py-2 text-lg border-b border-gray-100/20">
          <Textarea
            className="h-8"
            placeholder="Postea tu respuesta"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-end mt-3 pt-3 border-t border-gray-100/20">
            <Button
              className={`${
                replyText ? "bg-white cursor-pointer" : ""
              }  px-2 py-2 text-sm`}
              text={
                loading ? (
                  <Loader2 className="animate-spin h-6 w-6 text-white" />
                ) : (
                  "Responder"
                )
              }
              onClick={() => {
                handleComment(comment.id);
                setReplyText("");
                setActiveReplyId(null);
              }}
            />
          </div>
        </div>
      )}

      {comment.replies.map((reply) => (
        <CommentThread
          key={reply.id}
          comment={reply}
          activeReplyId={activeReplyId}
          setActiveReplyId={setActiveReplyId}
          replyText={replyText}
          setReplyText={setReplyText}
          handleComment={handleComment}
          handleDeleteComment={handleDeleteComment}
          handleEditComment={handleEditComment}
          loading={loading}
          postId={postId}
        />
      ))}
    </div>
  );
}
