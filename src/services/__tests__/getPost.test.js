import getPost from '../getPost';

global.fetch = vi.fn();

describe('getPost', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('debe hacer una petición GET con el postId y devolver el post', async () => {
    const postId = '123';
    const mockPost = { id: postId, content: 'Contenido del post', createdAt: '2025-08-05' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPost,
    });

    const post = await getPost(postId);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/post/${postId}`),
      expect.objectContaining({
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
    );

    expect(post).toEqual(mockPost);
  });

  it('debe lanzar error si la respuesta no es ok', async () => {
    const postId = '123';

    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error' }),
    });

    await expect(getPost(postId)).rejects.toThrow('Error');
  });
});
