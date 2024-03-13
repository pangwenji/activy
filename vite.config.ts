import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vuePlugin({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['page-content', 'page-view', 'view'].includes(tag),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api759': {
        target: 'https://9ftesetweb.agst97.com/api759',

        // target: "https://brazilh5.agst97.com/api759",
        // target:"http://43.155.107.44:9501/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api759/, ''),
      },
      '/uploadfile': {
        target: 'http://192.168.110.23:9501/',
        // target:"http://43.155.107.44:9501/",
        changeOrigin: true,
      },
    },
    https: false,
    host: '0.0.0.0',
    port: 3001,
  },
  build: {
    assetsInlineLimit: 0,
  },
})
