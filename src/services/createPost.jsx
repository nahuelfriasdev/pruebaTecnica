const baseUrl = import.meta.env.VITE_API_URL;

export default async function createPost(post, date) {
  const response = await fetch(`${baseUrl}/post`, {
    method: 'POST',
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
    throw new Error(data.message || 'Error al crear el post');
  }
  return data;
}