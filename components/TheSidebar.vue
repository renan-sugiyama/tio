<template>
  <a-layout-sider
    v-model="collapsed"
    :trigger="null"
    collapsible
    class="the-sidebar"
  >
    <div class="logo" />
    <!-- TODO default-selected-keys based on url-->
    <a-menu
      :default-selected-keys="[activeRoute]"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @click="onNavigate"
    >
      <a-menu-item key="registration-product-list">
        <a-icon type="tags" />
        <span>TODO Produtos</span>
      </a-menu-item>

      <a-menu-item key="registration-order-list">
        <a-icon type="profile" />
        <span>TODO Pedidos</span>
      </a-menu-item>

      <!-- <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" /><span>Cadastro</span></span>
        <a-menu-item key="5"> OPTION 5 </a-menu-item>
        <a-menu-item key="6"> Option 6 </a-menu-item>
      </a-sub-menu> -->

      <!-- <a-sub-menu key="sub2">
        <span slot="title"
          ><a-icon type="appstore" /><span>Navigation Two</span></span
        >
        <a-menu-item key="9"> Option 9 </a-menu-item>

        <a-menu-item key="10"> Option 10 </a-menu-item>

        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11"> Option 11 </a-menu-item>
          <a-menu-item key="12"> Option 12 </a-menu-item>
        </a-sub-menu>
      </a-sub-menu> -->
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
  computed: {
    activeRoute() {
      return this.$route.name
    },
  },
  methods: {
    onNavigate({ key }) {
      this.$router.push({ name: key })
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

  .sidebar-item {
    color: @sidebar-font-color;
  }
}
</style>
