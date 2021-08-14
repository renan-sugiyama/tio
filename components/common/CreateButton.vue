<template>
  <div class="header-list">
    <slot name="headerOptions">
      <div v-if="headerActions" class="header-options">
        <template v-for="(action, index) in headerActions">
          <a-button
            :key="action.label"
            type="primary"
            :icon="action.icon"
            @click="action.click"
          >
            {{ action.label }}
          </a-button>
          <a-divider
            v-if="index !== headerActions.length"
            :key="`${action.label}_divider`"
            type="vertical"
          />
        </template>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CreateButton',
  props: {
    headerActions: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
