import createComment from '../createComment';

global.fetch = vi.fn();

describe('createComment', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('debe hacer una petición POST con los datos correctos y devolver el comentario', async () => {
    const comment = 'Comentario de prueba';
    const date = '2025-08-06T15:00:00Z';
    const user = { name: 'Ana', avatar: 'avatar-ana.png' };
    const postId = '456';
    const parentId = '123'; // opcional, puede ser null
    const mockResponse = {
      id: '789',
      content: comment,
      createdAt: new Date(date).toISOString(),
      name: user.name,
      avatar: user.avatar,
      parentId,
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await createComment(comment, date, user, postId, parentId);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/post/${postId}/comment`),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          createdAt: new Date(date).toISOString(),
          name: user.name,
          avatar: user.avatar,
          content: comment,
          parentId
        }),
      })
    );

    expect(result).toEqual(mockResponse);
  });

  it('debe manejar correctamente cuando parentId es null', async () => {
    const comment = 'Comentario sin parent';
    const date = '2025-08-06T15:00:00Z';
    const user = { name: 'Ana', avatar: 'avatar-ana.png' };
    const postId = '456';
    const parentId = null;
    const mockResponse = {
      id: '790',
      content: comment,
      createdAt: new Date(date).toISOString(),
      name: user.name,
      avatar: user.avatar,
      parentId: null,
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await createComment(comment, date, user, postId);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/post/${postId}/comment`),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          createdAt: new Date(date).toISOString(),
          name: user.name,
          avatar: user.avatar,
          content: comment,
          parentId: null
        }),
      })
    );

    expect(result).toEqual(mockResponse);
  });

  it('debe lanzar error si la respuesta no es ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error al crear el comentario' }),
    });

    await expect(createComment('comentario', '2025-08-06', { name: 'Ana', avatar: 'avatar.png' }, '456')).rejects.toThrow('Error al crear el comentario');
  });
});
