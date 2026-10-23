import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Builds the components as a library (dist-lib/), separate from the app build.
// Used by the Claude Design sync; types come from tsconfig.lib.json.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: false,
  build: {
    outDir: 'dist-lib',
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index', cssFileName: 'index' },
    rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
  },
})
