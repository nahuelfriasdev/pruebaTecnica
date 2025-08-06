import { create } from 'zustand'
import getAllPosts from '../services/getAllPosts'
import getComents from '../services/getComments'
import getPost from '../services/getPost'

export const usePostStore = create((set) => ({
  posts: [],
  post: {},
  loadingPost: true,
  fetchPosts: async () => {
    set({ loadingPost: true });
    const data = await getAllPosts();
    set({ posts: data, loadingPost: false });
  },
  fetchSinglePost: async (postId) => {
    set({ loadingPost: true });
    const singlePost = await getPost(postId)
    set({post: singlePost, loadingPost: false})
  },
  addPost: (newPost) =>
    set((state) => ({
      posts: [newPost, ...state.posts],
    })),
  comments: [],
  fetchComments: async (postId) => {
    set({comments: []})
    const allComments = await getComents(postId)
    set({comments: allComments})
  },
  addComent: (newComment) =>
    set((state) => ({
      comments: [newComment, ...state.comments],
    })),
  clearPosts: () => set({ posts: [] }),
}))
