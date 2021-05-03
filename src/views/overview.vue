<template>
  <div class="overview">
    <Head />
    <Render_images />
    <Preview_image />
  </div>
</template>

<script>
import Head from "../components/head.vue";
import Preview_image from "../components/preview_image.vue";
import Render_images from "../components/render_images";
export default {
  name: "Overview",

  components: { Head, Render_images, Preview_image },
};
</script>

<style lang="scss" scoped>
@import "../assets/addons/icon/css/materialdesignicons.min.css";
@import "../assets/style/overview.scss"
</style>