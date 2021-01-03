export default {
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
