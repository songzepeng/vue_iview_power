<template>
  <div class="layout">
    <Header class="header"
      >后台权限管理系统<router-link to="/home/a1">a1</router-link>
      <router-link to="/home/a2">a2</router-link></Header
    >
    <Layout :style="{ minHeight: '100vh' }">
      <Sider collapsible :collapsed-width="78">
        <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']">
          <!-- <MenuItem name="1-1" to="/home/userControl">
            <Icon type="ios-navigate"></Icon>
            <span>用户管理</span>
          </MenuItem>
          <MenuItem name="1-2" to="/home/actorControl">
            <Icon type="md-desktop" />
            <span>角色管理</span>
          </MenuItem>
          <MenuItem name="1-3" to="/home/permissionControl">
            <Icon type="ios-flask" />
            <span>权限管理</span>
          </MenuItem> -->
          <Submenu v-for="menu in rootMenu" :key="menu.id" name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              {{ menu.des }}
            </template>
            <MenuItem
              v-for="menuItem in getChildMenu(menu.id)"
              name="1-3"
              :to="menuItem.url"
              :key="menuItem.id"
              >{{ menuItem.des }}</MenuItem
            >
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Content :style="{ padding: '0 16px 16px' }">
          <Breadcrumb :style="{ margin: '16px 0' }">
            <BreadcrumbItem>用户管理</BreadcrumbItem>
            <BreadcrumbItem>详情</BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <div style="height: 600px">
              <p>用户列表:</p>
              <router-view />
              <!-- <UserControl></UserControl> -->
              <!-- <actotControl></actotControl> -->
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
// import UserControl from "../components/userControl";
// import actotControl from "../components/actor/actorControl";
import request from "../service/request";
export default {
  name: "home",
  data() {
    return {
      userMenu: []
    };
  },
  computed: {
    // 计算属性
    rootMenu() {
      return this.userMenu.filter(menu => parseInt(menu.pId) === 0);
    }
  },
  created() {
    // 清理当前登录用户的所有权限
    sessionStorage.removeItem("LoginUserPer");

    request.getUserAllPer(1000).then(res => {
      console.log(res.data);
      this.userMenu = res.data.filter(item => item.type === "menu");
    });
  },

  methods: {
    getChildMenu(menuId) {
      return this.userMenu.filter(
        menu => parseInt(menu.pId) === parseInt(menuId)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  background-color: #515a6e;
  height: 130px;
  color: aquamarine;
  font-size: 50px;
  line-height: 130px;
}
</style>
