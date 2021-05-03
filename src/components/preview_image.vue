<template>
  <div class="preview_image center">
    <vs-dialog
      blur
      auto-width
      prevent-close
      scroll
      overflow-hidden
      v-model="preview_image"
      v-for="(photo, index) in previewed_image"
      :key="index"
    >
      <template #header>
        <vs-avatar>
          <img :src="photo.author_image[0]" alt="" />
        </vs-avatar>
        <div style="margin-left: 1em" class="textss">
          <h4 class="not-margin">{{ photo.client_name }}</h4>
          <h4 style="font-weight: 200" class="not-margin">
            Captured by <b>{{ photo.name }}</b>
          </h4>
        </div>
      </template>
      <div class="con-image">
        <img
          v-for="(image, index) in photo.sample_image"
          :key="index"
          :src="image"
          alt=""
          style="margin-bottom: 1em; width: 100%"
        />
      </div>
      <template #footer>
        <div style="margin-top: 1em" class="footer-dialog">
          <vs-button style="background: #fff; color: #f2135d; font-weight: 400" block>
            Show the creator some love
            <template #animate>
              <i class="mdi mdi-heart-outline"></i>
            </template>
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data: () => ({
    active: false,
  }),

  computed: {
    ...mapState(["preview_image"]),

    ...mapGetters(["previewed_image"]),

    preview_image: {
      get() {
        return this.$store.state.preview_image;
      },
      set(new_value) {
        this.$store.state.preview_image = new_value;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(../assets/addons/icon/css/materialdesignicons.min.css);
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.con-image {
  border-radius: inherit;

  img {
    display: block;
    position: relative;
    border-radius: inherit;
    max-width: 350px;
  }
}
</style>