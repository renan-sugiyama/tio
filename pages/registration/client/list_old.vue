<template>
  <div>
    <a-button type="primary">
      <NuxtLink to="/registration/client">Adicionar</NuxtLink>
    </a-button>
    <a-table :columns="columns" :data-source="dataList" bordered>
      <template v-for="col in columns" :slot="col" slot-scope="text">
        <div :key="col">
          <span>
            {{ text }}
          </span>
        </div>
      </template>
      <template slot="action" slot-scope="text, record">
        <NuxtLink
          :to="{
            name: 'registration-client-id',
            params: { id: record.key },
          }"
          >Detalhes</NuxtLink
        >
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  computed: {
    dataList() {
      return this.$store.getters['clients/list']
    },
    columns() {
      return [
        {
          dataIndex: 'name',
          key: 'name',
          title: 'Nome',
          scopedSlots: { customRender: 'name' },
        },
        {
          dataIndex: 'age',
          key: 'age',
          title: 'Idade',
          scopedSlots: { customRender: 'age' },
        },
        {
          title: '',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ]
    },
  },
  async mounted() {
    await this.$store.dispatch('clients/setList')
  },
}
</script>
