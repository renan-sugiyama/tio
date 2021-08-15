import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      // TODO - clean all and go to login page
      // claims = null
      // Perform logout operations
    } else {
      ctx.commit('ON_AUTH_STATE_CHANGED_MUTATION', { authUser })
    }
  },
  login: async (_, { email, password }) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  },
  logout: async () => {
    await firebase.auth().signOut()
  },
}
