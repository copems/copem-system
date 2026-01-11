import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import Unfonts from 'unplugin-fonts/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts-next'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: 'src/pages',
      dts: 'src/typed-router.d.ts',
    }),
    Layouts(),
    vue(),
    vuetify({ autoImport: true }),
    vueDevTools(),
    Unfonts({
      google: {
        families: ['Roboto', 'Inter'], // Example: Add your fonts here
      },
      // OR for local fonts:
      // custom: { families: [{ name: 'MyFont', src: './src/assets/fonts/*' }] }
    }),
  ],
  server: {
    port: 3000,      // Change the port (default is 5173)
    host: true,      // Expose to network (allows access via your IP)
    open: true       // Automatically open the browser on start
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
