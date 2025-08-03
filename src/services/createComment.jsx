const baseUrl = import.meta.env.VITE_API_URL;

export default async function createComment(comment, date, postId, parentId = null) {
  const response = await fetch(`${baseUrl}/post/${postId}/comment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      createdAt: new Date(date).toISOString(),
      content: comment,
      parentId
    })
  })

  const data = await response.json();
  if(!response.ok) {
    throw new Error(data.message || 'Error al crear el comentario');
  }
  return data;
}