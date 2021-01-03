export default function ({ store, redirect, route }) {
  if (!store.state.user.uid && route.path !== '/') {
    return redirect('/')
  }
}
