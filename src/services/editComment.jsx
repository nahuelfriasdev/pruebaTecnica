const baseUrl = import.meta.env.VITE_API_URL;

export default async function editComment(comment, date, postId,commentId) {
  const response = await fetch(`${baseUrl}/post/${postId}/comment/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      createdAt: new Date(date).toISOString(),
      content: comment
    })
  })

  const data = await response.json();
  if(!response.ok) {
    throw new Error(data.message || 'Error al editar el comentario');
  }
  return data;
}