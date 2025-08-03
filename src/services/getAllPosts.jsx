const baseUrl = import.meta.env.VITE_API_URL;

export default async function getAllPosts() {
  const response = await fetch(`${baseUrl}/post`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const data = await response.json();
  if(!response.ok) {
    throw new Error(data.message || 'Error al recuperar los posts');
  }
  return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}