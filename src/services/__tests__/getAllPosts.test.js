/// <reference types="vitest" />
import getAllPosts from '../getAllPosts';

global.fetch = vi.fn();

describe('getAllPosts', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('debe hacer una petición GET y devolver los posts ordenados', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: 1, content: 'Hola mundo', createdAt: '2025-08-05' },
        { id: 2, content: 'Otro post', createdAt: '2025-08-06' }
      ]
    });

    const posts = await getAllPosts();

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/post'), expect.any(Object));
    // Verificar que estén ordenados por createdAt descendente
    expect(posts[0].createdAt).toBe('2025-08-06');
    expect(posts[1].createdAt).toBe('2025-08-05');
  });

  it('debe lanzar error si la respuesta no es ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Error' }),
    });

    await expect(getAllPosts()).rejects.toThrow('Error');
  });
});
