import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  setList: async (ctx, params = {}) => {
    // const dataQuery = firebase
    //   .database()
    //   .ref('clients')
    //   // .limitToLast(params?.limit || 10)
    //   .orderByChild('name')
    //   .startAt()
    // const dataList = await dataQuery.once('value')
    // const dataListValues = []
    // dataList.forEach((item) => {
    //   console.log(item.key)
    //   console.log(item.val)
    //   dataListValues.push({ ...item.val(), key: item.key })
    // })

    const db = firebase.firestore()
    const dataRef = db.collection('clients')
    const dataQuery = dataRef.orderBy('name').startAt(2).limit(2)
    const dataList = await dataQuery.get()
    const dataListValues = []
    dataList.forEach((doc) => {
      dataListValues.push({ ...doc.data(), id: doc.id })
    })
    ctx.commit('setList', dataListValues)
  },
  createItem: async (ctx, { name, age }) => {
    const dataQuery = firebase.database().ref('clients')
    const teste = await dataQuery.push()
    teste.set({
      name,
      age,
    })
  },
  editItem: async (ctx, { name, age, key }) => {
    await firebase
      .database()
      .ref('clients/' + key)
      .set({
        name,
        age,
      })
  },
}
