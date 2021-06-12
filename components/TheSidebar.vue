<template>
  <a-layout-sider
    v-model="collapsed"
    :trigger="null"
    collapsible
    class="the-sidebar"
  >
    <div class="logo" />
    <a-menu
      :default-selected-keys="['1']"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @click="teste"
    >
      <a-menu-item key="1">
        <a-icon type="pie-chart" />
        <span>
          <NuxtLink to="/registration/client/list">Clientes</NuxtLink>
        </span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="desktop" />
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="inbox" />
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" /><span>Cadastro</span></span>
        <a-menu-item key="5"> aaaaaaaaaaaa </a-menu-item>
        <a-menu-item key="6"> Option 6 </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"
          ><a-icon type="appstore" /><span>Navigation Two</span></span
        >
        <a-menu-item key="9"> Option 9 </a-menu-item>
        <a-menu-item key="10"> Option 10 </a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11"> Option 11 </a-menu-item>
          <a-menu-item key="12"> Option 12 </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: 'TheSidebar',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    teste({ item, key, keyPath }) {
      console.log(item)
      console.log(key)
      console.log(keyPath)
    },
  },
}
</script>

<style lang="less" scoped>
.the-sidebar {
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>
