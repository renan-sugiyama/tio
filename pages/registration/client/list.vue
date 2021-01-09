<template>
  <div>
    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      :pagination="pagination"
      item-layout="horizontal"
      :data-source="data"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <div>
          <div>Nome: {{ item.name }}</div>
          <div>Idade: {{ item.age }}</div>
        </div>
        <a slot="actions"
          ><a-button type="link" @click="showEditDrawer(item)"
            >Editar</a-button
          ></a
        >
        <a slot="actions">more</a>
      </a-list-item>
    </a-list>
    <ClientEditMode
      :data="editItem"
      :visible="isDrawerVisible"
      @close="closeEditDrawer"
    />
  </div>
</template>
<script>
import ClientEditMode from './../../../components/clients/editMode'
export default {
  components: {
    ClientEditMode,
  },
  data() {
    return {
      loading: true,
      data: [],
      isDrawerVisible: false,
      editItem: {},
      pagination: {
        onChange: (page) => {
          // TODO
        },
        pageSize: 3,
      },
    }
  },
  async mounted() {
    await this.getData({
      offset: 1,
      limit: 2,
    })
  },
  methods: {
    async getData(params) {
      try {
        this.loading = true
        await this.$store.dispatch('clients/setList', params)
        this.data = this.$store.getters['clients/list']
      } catch (error) {
        // TODO
      } finally {
        this.loading = false
      }
    },
    showEditDrawer(item) {
      this.editItem = item
      this.isDrawerVisible = true
    },
    closeEditDrawer(values) {
      this.editItem = {}
      this.isDrawerVisible = false
      if (values) {
        this.getData()
      }
    },
  },
}
</script>
<style>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
