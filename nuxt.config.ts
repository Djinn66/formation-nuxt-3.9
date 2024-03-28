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
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      theme: {
        themes: {
          light: {
            colors: {
              primary: '#0F2C69',
              bg_menu: '#0B3384',
              border: '#21438E',
              selectedText: '#79CEFF'
            },
          },
        },
      }
    }
  },
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
