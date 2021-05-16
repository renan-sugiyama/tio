export default {
  setIsMobile: (ctx) => {
    const isMobile = window.innerWidth <= 720
    ctx.commit('setIsMobile', isMobile)
  },
}
