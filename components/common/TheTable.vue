<template>
  <div class="the-table">
    <div class="filters">
      <a-row :gutter="[16, 16]" class="selectors">
        <form @submit.prevent="applyFilter">
          <a-col
            v-for="filter in filters"
            :key="filter.fieldName"
            :xs="{ span: 24 }"
            :md="{ span: 12 }"
            :lg="{ span: 8 }"
            :xl="{ span: 6 }"
          >
            <NumberInputFilter
              v-if="filter.type === 'number'"
              :value="filter.value"
              :title="filter.label"
              :on-key-enter="applyFilter"
              @input="(currentValue) => clearOtherFilters(currentValue, filter)"
            />

            <TextInputFilter
              v-if="filter.type === 'string'"
              :value="filter.value"
              :title="filter.label"
              :on-key-enter="applyFilter"
              @input="(currentValue) => clearOtherFilters(currentValue, filter)"
            />

            <DateInputFilter
              v-if="filter.type === 'date'"
              v-model="filter.value"
              :allow-clear="filter.allowClear"
              :title="filter.label"
              @input="applyFilter"
            />
          </a-col>
        </form>
      </a-row>

      <div class="actions">
        <a-button
          type="primary"
          shape="circle"
          icon="search"
          @click="applyFilter"
        />
      </div>
    </div>

    <!-- TODO trocar nome da classe e do CreateButton component -->
    <div class="table-header">
      <div>
        <h5 class="table-header__title">
          {{ tableTitle }}
        </h5>
      </div>
      <CreateButton :header-actions="headerActions" />
    </div>

    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataSource"
      :loading="loading"
      :pagination="false"
      :scroll="{ x: 700 }"
      class="table-component"
    >
      <template slot="createdAt" slot-scope="createdAt">
        {{ createdAt ? formatDateField(createdAt) : '' }}
      </template>

      <template slot="updatedAt" slot-scope="updatedAt">
        {{ updatedAt ? formatDateField(updatedAt) : '' }}
      </template>

      <template slot="deliveryDate" slot-scope="deliveryDate">
        {{ deliveryDate ? formatDateFieldMoment(deliveryDate) : '' }}
      </template>

      <template slot="departmentId" slot-scope="departmentId">
        {{ departmentId ? getProductDepartmentName(departmentId) : '' }}
      </template>

      <template slot="action" slot-scope="text, record">
        <template v-for="action in resultActions">
          <span
            :key="action.label"
            class="table-action"
            @click="() => action.click(record)"
          >
            {{ action.label }}
          </span>
          <a-divider :key="`${action.label}_delete`" type="vertical" />
        </template>

        <a-popconfirm
          title="Are you sure?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="deleteItemById(record.id)"
        >
          <span class="table-action table-action--delete"> Delete </span>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import FirebaseService from '~/service/firebase'
import NumberInputFilter from '~/components/common/filters/NumberInputFilter'
import TextInputFilter from '~/components/common/filters/TextInputFilter'
import DateInputFilter from '~/components/common/filters/DateInputFilter'
import CreateButton from '~/components/common/CreateButton'
import { filterOperators } from '~/enums/filterOperators'

export default {
  name: 'TheTable',
  components: {
    NumberInputFilter,
    TextInputFilter,
    DateInputFilter,
    CreateButton,
  },

  props: {
    collection: {
      type: String,
      required: true,
    },
    updatedElement: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    filtersOptions: {
      type: Array,
      default: () => [{}],
    },
    resultActions: {
      type: Array,
      default: () => [],
    },
    headerActions: {
      type: Array,
      default: () => [],
    },
    tableTitle: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      dataSource: [],
      loading: false,
      filters: [],
    }
  },

  computed: {
    ...mapGetters({
      departments: 'globalValues/getDepartments',
    }),
  },

  watch: {
    filtersOptions(newFilters) {
      this.filters = newFilters
    },

    updatedElement(item) {
      this.updateListSync(item)
    },
  },

  mounted() {
    this.filters = [...this.filtersOptions]
    this.getData(this.filters)
  },

  methods: {
    clearOtherFilters(currentValue, filterChanged) {
      this.filters = this.filters.map((filter) => {
        if (filterChanged.fieldName === filter.fieldName) {
          return { ...filter, value: currentValue }
        } else if (filter.type === 'date') {
          return filter
        }
        return {
          ...filter,
          value: '',
        }
      })
    },

    formatDateField(dateTimestamp) {
      return moment(new Date(dateTimestamp)).format('DD/MMM/YYYY')
    },

    formatDateFieldMoment(dateString) {
      return moment(dateString).format('DD/MMM/YYYY')
    },

    getProductDepartmentName(departmentId) {
      return (
        this.departments.find((department) => department.id === departmentId)
          ?.name || ''
      )
    },

    getFiltersMapped(filtersOptions) {
      const filters = filtersOptions.filter(
        (filterOption) => filterOption.value
      )
      const filtersMapped = []

      filters.forEach((filter) => {
        if (filter.operator === filterOperators.EQUALS) {
          filtersMapped.push({
            prop: filter.fieldName,
            operator: '==',
            value:
              filter.type === 'date'
                ? filter.value.format('YYYY-MM-DD')
                : filter.value,
          })
        } else if (filter.operator === filterOperators.INCLUDES) {
          filtersMapped.push({
            prop: filter.fieldName,
            operator: '>=',
            value:
              filter.type === 'date'
                ? filter.value.format('YYYY-MM-DD')
                : filter.value.toLowerCase(),
          })
          filtersMapped.push({
            prop: filter.fieldName,
            operator: '<=',
            value:
              filter.type === 'date'
                ? filter.value.format('YYYY-MM-DD')
                : filter.value.toLowerCase() + '\uF8FF',
          })
        }
      })

      return filtersMapped
    },

    async getData(filtersOptions) {
      const filters = this.getFiltersMapped(filtersOptions)
      console.log('filters', filters)
      try {
        this.loading = true
        const data = await FirebaseService.getListFiltered(
          this.collection,
          filters
        )
        this.dataSource = data
      } catch (error) {
        this.$message.error('Error trying to get the data')
      } finally {
        this.loading = false
      }
    },

    updateListSync(item) {
      const elementIndex = this.dataSource.findIndex(
        (element) => element.id === item.id
      )
      if (elementIndex > -1) {
        this.dataSource.splice(elementIndex, 1, item)
      } else {
        this.dataSource.unshift(item)
      }
    },

    removeElementListSync(elementToRemoveId) {
      const elementIndex = this.dataSource.findIndex(
        (element) => element.id === elementToRemoveId
      )
      if (elementIndex > -1) {
        this.dataSource.splice(elementIndex, 1)
      }
    },

    async deleteItemById(id) {
      try {
        this.loading = true
        await FirebaseService.deleteItemById(this.collection, { id })
        this.removeElementListSync(id)
      } catch (error) {
        this.$message.error('It was not possible to delete the item')
      } finally {
        this.loading = false
      }
    },

    async applyFilter() {
      await this.getData(this.filters)
      this.$emit('filtersApplied', this.filters)
    },
  },
}
</script>

<style lang="less" scoped>
.the-table {
  ::v-deep .ant-table-tbody {
    background-color: white;
  }
  .filters {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    margin: 10px 0 20px;
    border-bottom: 1px solid @border-color-base;

    .selectors {
      flex-grow: 1;
    }
    .actions {
      margin-left: 8px;
    }
  }

  .table-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    &__title {
      font-size: 18px;
      font-weight: 600;
      color: @primary-color;
    }
  }

  .table-action {
    cursor: pointer;
    color: @link-color;

    &--delete {
      color: @error-color;
    }
  }
}
</style>
