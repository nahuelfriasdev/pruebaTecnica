const baseUrl = import.meta.env.VITE_API_URL;

export default async function createPost(post, date, user) {
  const response = await fetch(`${baseUrl}/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      createdAt: new Date(date).toISOString(),
      name:user.name,
      avatar:user.avatar,
      content: post
    })
  })

  const data = await response.json();
  if(!response.ok) {
    throw new Error(data.message || 'Error al crear el post');
  }
  return data;
}