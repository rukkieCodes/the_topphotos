<template>
  <div class="render_images">
    <div class="cards">
      <div v-for="(photo, index) in display_gallery" :key="index" class="card">
        <div class="card_head">
          <vs-button class="button" icon>
            <span class="span"> 54 </span>
            <i class="mdi mdi-heart-outline"></i>
          </vs-button>
        </div>
        <div class="image">
          <img
            :src="photo.sample_image[0]"
            alt=""
            class="sample_img"
            @click="preview_image(photo)"
          />
        </div>
        <div class="foot">
          <vs-avatar circle>
            <img :src="photo.author_image[0]" alt="" />
          </vs-avatar>
          <div class="text">
            <h1>{{ photo.name }}</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="render_cards_foot">
      <div class="cont">
        <vs-button
          @click="perPage += 10"
          class="cont_button"
          block
        >
          Load More
          <template #animate>
            <i class="mdi mdi-reload"></i>
          </template>
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "TopPhotosRenderImages",

  data: () => ({
    page: 1,
    perPage: 50,
    pages: [],
    new_photos: [],
  }),

  watch: {
    copies() {
      this.setPages();
    },
  },

  created() {
    this.get_photos();
  },

  methods: {
    ...mapActions(["get_photos"]),

    ...mapMutations(["preview_image"]),

    setPages() {
      let number_of_pages = Math.ceil(
        this.$store.getters.photos.length / this.perPage
      );
      for (let index = 1; index <= number_of_pages; index++) {
        this.pages.push(index);
      }
    },

    paginate(copies) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return copies.slice(from, to);
    },
  },

  mounted() {},

  computed: {
    ...mapGetters(["photos"]),

    display_gallery() {
      return this.paginate(
        this.$store.getters.photos.sort(function () {
          return 0.5 - Math.random();
        })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(../assets/style/render_images.css);
@import url(../assets/addons/icon/css/materialdesignicons.min.css);
</style>
