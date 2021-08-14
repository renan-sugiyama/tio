<template>
  <div class="the-table">
    <div class="filters">
      <a-row :gutter="16" class="selectors">
        <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <template v-for="filter in filtersOptions">
            <TextInputFilter
              :key="filter.fieldName"
              v-model="filter.value"
              :title="filter.label"
            />
          </template>
        </a-col>
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

    <div class="header-actions">
      <CreateButton :header-actions="headerActions" />
    </div>

    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="dataFiltered"
      :loading="loading"
      :pagination="false"
      :scroll="{ x: 1300 }"
      class="table-component"
    >
      <template v-if="hasDepartment" slot="createdAt" slot-scope="createdAt">
        {{ createdAt ? formatDateField(createdAt) : '' }}
      </template>

      <template v-if="hasDepartment" slot="updatedAt" slot-scope="updatedAt">
        {{ updatedAt ? formatDateField(updatedAt) : '' }}
      </template>

      <template
        v-if="hasDepartment"
        slot="deliveryDate"
        slot-scope="deliveryDate"
      >
        {{ deliveryDate ? formatDateField(deliveryDate) : '' }}
      </template>

      <template
        v-if="hasDepartment"
        slot="departmentId"
        slot-scope="departmentId"
      >
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

        <span
          class="table-action table-action--delete"
          @click="() => deleteItemById(record.id)"
        >
          Deletar
        </span>
      </template>
    </a-table>
  </div>
</template>

<script>
import moment from 'moment'
import FirebaseService from '~/service/firebase'
import TableFilterService from '~/service/TableFilterService'
import TextInputFilter from '~/components/common/filters/TextInputFilter'
import CreateButton from '~/components/common/CreateButton'

export default {
  name: 'TheTable',
  components: {
    TextInputFilter,
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
    hasDepartment: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      dataSource: [],
      loading: false,
      dataFiltered: [],
      tableFilterService: null,
      departments: [],
    }
  },

  watch: {
    updatedElement(item) {
      this.updateListSync(item)
    },
  },

  async mounted() {
    if (this.hasDepartment) {
      await this.getDepartmentsList()
    }
    this.getData()
  },

  methods: {
    formatDateField(dateTimestamp) {
      return moment(new Date(dateTimestamp)).format('DD/MMM/YYYY')
    },

    async getDepartmentsList() {
      this.departments = await FirebaseService.getAllOnce('departments')
    },

    getProductDepartmentName(departmentId) {
      return (
        this.departments.find((department) => department.id === departmentId)
          ?.name || ''
      )
    },

    async getData() {
      try {
        this.loading = true
        const data = await FirebaseService.getAllOnce(this.collection)
        console.log(data)
        this.dataSource = data
        this.dataFiltered = data
      } catch (error) {
        // TODO
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
        // TODO
      } finally {
        this.loading = false
      }
    },

    applyFilter() {
      this.dataFiltered = TableFilterService.filterData(
        this.dataSource,
        this.filtersOptions
      )
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
  }

  .header-actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
  }

  .table-action {
    cursor: pointer;
    color: @link-color;
  }
}
</style>
