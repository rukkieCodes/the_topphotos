<template>
  <div class="home">
    <vs-navbar shadow square center-collapsed v-model="active">
      <template #left>
        <vs-button
          style="height: 2.5em"
          @click="drawer = !drawer"
          flat
          icon
        >
          <i class="mdi mdi-menu"></i>
        </vs-button>
      </template>
      <!-- <vs-navbar-item :active="active == 'guide'" id="guide">
        Guide
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'docs'" id="docs">
        Documents
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'components'" id="components">
        Components
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'license'" id="license">
        license
      </vs-navbar-item> -->
      <template #right>
        <vs-input color="#4169e1" v-model="search" placeholder="Search">
          <template #icon>
            <i class="mdi mdi-magnify"></i>
          </template>
        </vs-input>
        <vs-button flat>Login</vs-button>
      </template>
    </vs-navbar>

    <vs-sidebar fixed v-model="active" :open.sync="drawer">
      <template #logo>
      </template>
      <vs-sidebar-item to="/" id="home">
        <template #icon>
          <i class="mdi mdi-home"></i>
        </template>
        Home
      </vs-sidebar-item>
      <vs-sidebar-item to="blog" id="blog">
        <template #icon>
          <i class="mdi mdi-blogger"></i>
        </template>
        Blog
      </vs-sidebar-item>
      <vs-sidebar-item to="story" id="story">
        <template #icon>
          <i class="mdi mdi-book-open-page-variant"></i>
        </template>
        Story time
      </vs-sidebar-item>
      <vs-sidebar-item id="contact">
        <template #icon>
          <i class="mdi mdi-contacts-outline"></i>
        </template>
        Contact
      </vs-sidebar-item>

      <!-- <template #footer>
        <vs-row justify="space-between">
          <vs-avatar>
            <img src="../assets/images/tosin.jpeg" alt="" />
          </vs-avatar>

          <vs-avatar badge-color="danger" badge-position="top-right">
            <i class="mdi mdi-bell"></i>

            <template #badge> 28 </template>
          </vs-avatar>
        </vs-row>
      </template> -->
    </vs-sidebar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    active: `${ location.pathname.slice(1, location.pathname.length) }`,
    drawer: false,
    search: "",
  }),
};
</script>

<style lang="scss" scoped>
@import url(../assets/addons/icon/css/materialdesignicons.min.css);
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
