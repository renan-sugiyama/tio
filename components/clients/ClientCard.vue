<template>
  <div class="client-card">
    <div>
      <strong>{{ client.name }}</strong>
    </div>
    <div>{{ client.phoneNumber || 'TODO sem telefone' }}</div>
    <div>{{ client.email || 'TODO sem email' }}</div>
    <div>{{ client.address || 'TODO sem endereço' }}</div>
    <div>{{ client.documentNumber || 'TODO sem documento' }}</div>
  </div>
</template>

<script>
export default {
  name: 'ClientCard',
  props: {
    client: {
      type: Object,
      required: true,
    },
  },
}
</script>
