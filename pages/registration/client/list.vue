<template>
  <div class="client-list">
    <div class="filters">
      <a-row :gutter="16" class="selectors">
        <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <TextInputFilter
            v-model="filtersOptions.clientName"
            title="TODO name"
          />
        </a-col>

        <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <TextInputFilter
            v-model="filtersOptions.clientPhoneNumber"
            title="TODO phoneNumber"
          />
        </a-col>

        <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <TextInputFilter
            v-model="filtersOptions.clientEmail"
            title="TODO email"
          />
        </a-col>

        <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <TextInputFilter
            v-model="filtersOptions.clientAddress"
            title="TODO address"
          />
        </a-col>

        <a-col :xs="{ span: 8 }" :md="{ span: 6 }" :lg="{ span: 4 }">
          <TextInputFilter
            v-model="filtersOptions.clientDocumentNumber"
            title="TODO documentNumber"
          />
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

    <TheTableList
      ref="tableList"
      collection="clients"
      :filters="filters"
      :header-actions="headerActions"
      table-title="TODO Lista de clientes"
      @edit="showEditDrawer"
    >
      <template v-slot:item="{ item }">
        <ClientCard :client="item" />
      </template>
    </TheTableList>

    <ClientEditMode
      :data="editItem"
      :visible="isDrawerVisible"
      @close="closeEditDrawer"
      @update="updateList"
    />
  </div>
</template>

<script>
import ClientCard from '~/components/clients/ClientCard'
import ClientEditMode from '~/components/clients/ClientEditMode'
import TheTableList from '~/components/common/TheTableList'
import TextInputFilter from '~/components/common/filters/TextInputFilter'

export default {
  components: {
    ClientCard,
    ClientEditMode,
    TheTableList,
    TextInputFilter,
  },

  data() {
    return {
      isDrawerVisible: false,
      editItem: {},
      filters: [],
      filtersOptions: {
        clientName: '',
        clientPhoneNumber: '',
        clientEmail: '',
        clientAddress: '',
        clientDocumentNumber: '',
      },
      headerActions: [
        {
          click: this.showEditDrawer,
          label: 'Novo',
          icon: 'plus',
        },
        {
          click: this.goToAddClient,
          label: 'Novo 2',
          icon: 'plus',
        },
      ],
    }
  },

  methods: {
    showEditDrawer(item) {
      this.editItem = item
      this.isDrawerVisible = true
    },

    updateList() {
      this.closeEditDrawer()
      this.$refs.tableList.refresh()
    },

    closeEditDrawer() {
      this.editItem = {}
      this.isDrawerVisible = false
    },

    goToAddClient() {
      this.$router.push({ path: '/registration/client' })
    },

    applyFilter() {
      const newFilters = []
      if (this.filtersOptions.clientName) {
        newFilters.push({
          prop: 'name',
          operator: '==',
          value: this.filtersOptions.clientName,
        })
      }
      if (this.filtersOptions.clientPhoneNumber) {
        newFilters.push({
          prop: 'phoneNumber',
          operator: '==',
          value: this.filtersOptions.clientPhoneNumber,
        })
      }
      if (this.filtersOptions.clientEmail) {
        newFilters.push({
          prop: 'email',
          operator: '==',
          value: this.filtersOptions.clientEmail,
        })
      }
      if (this.filtersOptions.clientAddress) {
        newFilters.push({
          prop: 'address',
          operator: '==',
          value: this.filtersOptions.clientAddress,
        })
      }
      if (this.filtersOptions.clientDocumentNumber) {
        newFilters.push({
          prop: 'documentNumber',
          operator: '==',
          value: this.filtersOptions.clientDocumentNumber,
        })
      }
      console.log('this.filters', this.filters)
      this.filters = newFilters
    },
  },
}
</script>

<style lang="less" scoped>
.client-list {
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
}
</style>
