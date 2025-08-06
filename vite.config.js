import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
  test: {
    globals: true,
    environment: 'jsdom', // necesario si usás fetch, DOM, etc.
  },
})
