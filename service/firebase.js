import firebase from 'firebase/app'
import 'firebase/auth'

class FirebaseService {
  static async getList(
    collection,
    { orderBy = 'updatedAt', orderDirection = 'asc', page = 0, limit = 10 }
  ) {
    const db = firebase.firestore()
    let collectionRef = null
    if (orderDirection === 'desc' && page !== 0) {
      collectionRef = db
        .collection(collection)
        .orderBy(orderBy, orderDirection)
        .limit(limit)
        .startAfter(page)
    } else if (orderDirection === 'desc') {
      collectionRef = db
        .collection(collection)
        .orderBy(orderBy, orderDirection)
        .limit(limit)
    } else {
      collectionRef = db
        .collection(collection)
        .orderBy(orderBy, orderDirection)
        .limit(limit)
        .startAfter(page)
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
      await db
        .collection(collection)
        .doc()
        .set({
          createdAt: Date.now(),
          ...rest,
          updatedAt: Date.now(),
        })
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
}

export default FirebaseService
