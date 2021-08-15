export default {
  setDepartments: ({ commit }, payload) => {
    commit('setDepartments', payload)
  },
  setMeasurements: ({ commit }, payload) => {
    commit('setMeasurements', payload)
  },
  setDeliveryPeriods: ({ commit }, payload) => {
    commit('setDeliveryPeriods', payload)
  },
}
