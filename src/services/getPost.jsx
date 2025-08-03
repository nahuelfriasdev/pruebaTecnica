const baseUrl = import.meta.env.VITE_API_URL;

export default async function getPost(postId) {
  const response = await fetch(`${baseUrl}/post/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json();
  if(!response.ok) {
    throw new Error(data.message || 'Error al recuperar el post');
  }
  return data;
}