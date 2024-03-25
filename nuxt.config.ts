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
        [`/${process.env.APP_GLOBAL_PREFIX}`]: {
          target: `http://${process.env.DB_HOST}:${process.env.DB_PORT}/`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
})
