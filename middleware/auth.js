export default function ({ store, redirect, route }) {
  const userUid = store.getters['admin/user'].uid
  if (!userUid && route.path !== '/login') {
    return redirect('/login')
  }
}
