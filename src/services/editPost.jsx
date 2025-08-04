const baseUrl = import.meta.env.VITE_API_URL;

export default async function editPost(post, date,postId) {
  const response = await fetch(`${baseUrl}/post/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      createdAt: new Date(date).toISOString(),
      content: post
    })
  })

  const data = await response.json();
  if(!response.ok) {
    throw new Error(data.message || 'Error al editar el post');
  }
  return data;
}