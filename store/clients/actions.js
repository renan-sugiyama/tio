// import FirebaseService from './../../service/firebase'

// export default {
//   setList: async (
//     ctx,
//     { orderBy = 'updatedAt', orderDirection = 'desc', page = 0, limit = 10 }
//   ) => {
//     const dataListValues = await FirebaseService.getList('clients', {
//       orderBy,
//       orderDirection,
//       page,
//       limit,
//     })
//     ctx.commit('setList', dataListValues)
//   },

//   // TODO remover esse método e colocar no lugar que precisar
//   getItemById: async (ctx, { id }) => {
//     await FirebaseService.getItemById('clients', id)
//   },
// }
