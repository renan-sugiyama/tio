export const state = () => ({
  user: {},
})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // perform logout operations
      console.log('mutations 1')
    } else {
      console.log('mutations 2')
      // Do something with the authUser and the claims object...
    }
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
    console.log('sadklçfjçlasdfjçlsdjaçf')
    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      )

      await dispatch('onAuthStateChangedAction', {
        authUser,
        claims,
      })
    }
  },
  onAuthStateChangedAction: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
      console.log('teste')
    } else {
      console.log('teste1 action')
    }
  },
}
