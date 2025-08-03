const baseUrl = import.meta.env.VITE_API_URL;

export default async function getAllComments(postId) {
  const response = await fetch(`${baseUrl}/post/${postId}/comment`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json();
  if(!response.ok) {
    throw new Error(data.message || 'Error al recuperar los comentarios del post');
  }
  return data;
}