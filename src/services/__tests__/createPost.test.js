import createPost from '../createPost';

global.fetch = vi.fn();

describe('createPost', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('debe hacer una petición POST con los datos correctos y devolver la respuesta', async () => {
    const postContent = 'Nuevo post';
    const date = '2025-08-06T12:00:00Z';
    const user = { name: 'Juan', avatar: 'avatar.png' };
    const mockResponse = { id: 1, content: postContent, createdAt: new Date(date).toISOString(), name: user.name, avatar: user.avatar };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await createPost(postContent, date, user);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/post'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          createdAt: new Date(date).toISOString(),
          name: user.name,
          avatar: user.avatar,
          content: postContent
        })
      })
    );

    expect(result).toEqual(mockResponse);
  });

  it('debe lanzar error si la respuesta no es ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error al crear' }),
    });

    await expect(createPost('post', '2025-08-06', { name: 'Juan', avatar: 'avatar.png' })).rejects.toThrow('Error al crear');
  });
});
