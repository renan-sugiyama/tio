import { filterOperators } from '~/enums/filterOperators'

class TableFilterService {
  filterData(data = [], filterOptions) {
    return data.filter((element) => this.filterElement(element, filterOptions))
  }

  filterElement(element, filterOptions) {
    return filterOptions.some((filter) => {
      if (filter.operator === filterOperators.INCLUDES) {
        return element[filter.fieldName]
          ?.toLowerCase()
          ?.includes(filter.value?.toLowerCase())
      }
      return false
    })
  }
}

export default new TableFilterService()
