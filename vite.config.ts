import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  ],
  server: {
    proxy: {
      // This will proxy requests like /functions/v1/create-order to Supabase
      '/functions/v1': {
        target: 'https://sldznvzicixnlqqnrdys.supabase.co',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/functions\/v1/, '/functions/v1'),
      },
    },
  },
})
