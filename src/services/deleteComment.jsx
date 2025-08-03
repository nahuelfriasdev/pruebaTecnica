const baseUrl = import.meta.env.VITE_API_URL;

export default async function deleteComment(postId, commentId) {
  const response = await fetch(`${baseUrl}/post/${postId}/comment/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json();
  if(!response.ok) {
    throw new Error(data.message || 'Error al borrar el comentario');
  }
  return data;
}