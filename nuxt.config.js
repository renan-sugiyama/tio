import path from 'path'
import fs from 'fs'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'tio',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/vars/variables.less'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/antd-ui'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/style-resources',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCKrfm5MWYcGIg__DKMTal2LsOneG3-s9U',
          authDomain: 'sugiyama-gestao-pedidos.firebaseapp.com',
          databaseURL:
            'https://sugiyama-gestao-pedidos-default-rtdb.firebaseio.com',
          projectId: 'sugiyama-gestao-pedidos',
          storageBucket: 'sugiyama-gestao-pedidos.appspot.com',
          messagingSenderId: '304187832408',
          appId: '1:304187832408:web:fcb5e937b7f4d28a79f22d',
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedMutation:
                'admin/ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'admin/onAuthStateChangedAction',
              subscribeManually: false,
            },
          },
          database: true,
          firestore: {
            enablePersistence: true,
            settings: {
              // Firestore Settings - currently only works in SPA mode
            },
          },
        },
      },
    ],
  ],
  styleResources: {
    less: '@/assets/vars/variables.less',
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },

  router: {
    middleware: 'auth',
  },

  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt')),
    },
  },
}
