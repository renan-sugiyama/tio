export default {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // perform logout operations
      console.log('mutations 1')
    } else {
      console.log('mutations 2')
      const { uid, email, emailVerified } = authUser
      state.user = { uid, email, emailVerified }
    }
  },
}
