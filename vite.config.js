import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from "vite-plugin-pages";
import veauryVitePlugins from 'veaury/vite/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Pages({resolver: 'vue'}),
    veauryVitePlugins({
      type: 'vue',
    }),
  ],
  server: {
    port: 8080
  },
})
