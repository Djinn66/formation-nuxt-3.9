// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/',
  devtools: {
    enabled: true,
  },
  ssr: false,
  typescript: {
    typeCheck: true,
    strict: true,
  },
  runtimeConfig: {
    public: {
      FETCH_LIST_INTERVALE: process.env.FETCH_LIST_INTERVALE || '100000',
    },
  },
  modules: ['@pinia/nuxt', 'vuetify-nuxt-module'],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
})
