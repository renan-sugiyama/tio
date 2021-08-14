import firebase from 'firebase/app'
import 'firebase/auth'

class FirebaseService {
  static async getList(
    collection,
    { orderBy = 'updatedAt', orderDirection = 'asc', page = 0, limit = 10 },
    filters = []
  ) {
    const db = firebase.firestore()
    let collectionRef = db.collection(collection)
    filters.forEach((filter) => {
      collectionRef = collectionRef.where(
        filter.prop,
        filter.operator,
        filter.value
      )
    })
    collectionRef = collectionRef.orderBy(orderBy, orderDirection).limit(limit)

    if (orderDirection === 'desc' && page !== 0) {
      collectionRef = collectionRef.startAfter(page)
    }

    try {
      const dataList = await collectionRef.get()
      const nextPage =
        orderDirection === 'desc'
          ? dataList.docs[dataList.docs.length - 1]
          : dataList.docs[dataList.docs.length - 1]
      const dataListValues = []
      dataList.forEach((doc) => {
        dataListValues.push({ ...doc.data(), id: doc.id })
      })
      return {
        results: dataListValues,
        nextPage,
      }
    } catch (error) {
      // TODO?
      console.log(error)
    }
  }

  static async createOrEditItem(collection, { id, ...rest }) {
    const db = firebase.firestore()
    if (id) {
      await db
        .collection(collection)
        .doc(id)
        .set({
          ...rest,
          updatedAt: Date.now(),
        })
    } else {
      const createdAt = Date.now()
      const updatedAt = Date.now()
      const result = await db.collection(collection).add({
        createdAt,
        ...rest,
        updatedAt,
      })

      return {
        id: result.id,
        createdAt,
        updatedAt,
      }
    }
  }

  static async getItemById(collection, { id }) {
    const db = firebase.firestore()
    const docRef = db.collection(collection).doc(id)
    const item = await docRef.get()
    return item.exists ? item.data() : {}
  }

  static async deleteItemById(collection, { id }) {
    const db = firebase.firestore()
    await db.collection(collection).doc(id).delete()
  }

  static async getAllOnce(collection) {
    const db = firebase.firestore()
    const docRef = db.collection(collection)
    const querySnapshot = await docRef.get()

    const list = []
    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id })
    })
    return list
  }

  static async getAllOnceStartWith(collection, prop, startWithText) {
    const db = firebase.firestore()
    const docRef = db
      .collection(collection)
      .where(prop, '>=', startWithText)
      .where(prop, '<=', startWithText + '\uF8FF')
    const querySnapshot = await docRef.get()

    const list = []
    querySnapshot.forEach((doc) => {
      list.push({ ...doc.data(), id: doc.id })
    })
    return list
  }

  static async incrementCounter(document) {
    const db = firebase.firestore()
    const docRef = db.collection('counters').doc(document)
    await docRef.update('count', firebase.firestore.FieldValue.increment(1))
    const querySnapshot = await docRef.get()
    return querySnapshot.data().count
  }
}

export default FirebaseService
