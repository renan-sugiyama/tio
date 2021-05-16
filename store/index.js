export const state = () => ({
  user: {},
})

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // perform logout operations
      // TODO entender
    } else {
      // TODO entender
      // Do something with the authUser and the claims object...
    }
  },
}

export const actions = {
  async nuxtServerInit({ dispatch }, ctx) {
    // INFO -> Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
    /** Get the VERIFIED authUser on the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user
      // TODO entender
      await dispatch('onAuthStateChangedAction', {
        authUser,
        claims,
      })
    }
  },

  onAuthStateChangedAction: (state, { authUser, claims }) => {
    if (!authUser) {
      // TODO entender
      // claims = null
      // Perform logout operations
    } else {
      // TODO entender
    }
  },
}
