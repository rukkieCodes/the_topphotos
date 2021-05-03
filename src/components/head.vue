<template>
  <div class="head">
    <div class="container">
      <div class="content">
        <div class="left">
          <h1>The Top Photos</h1>
          <p>
            At The Top Photos, We keep your perfect memories alive Over 1.9
            million+ high quality stock images shared by our talented community.
          </p>

          <div class="search">
            <div class="input">
              <button>
                <i class="mdi mdi-magnify"></i>
              </button>
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    search: "",
  }),
};
</script>

<style lang="scss" scoped>
@import url(../assets/style/head.css);
@import url(../assets/addons/icon/css/materialdesignicons.min.css);
</style>
