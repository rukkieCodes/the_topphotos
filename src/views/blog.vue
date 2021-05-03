<template>
  <div class="blog">
    <div class="container">
      <div class="head">
        <div class="container">
          <div class="content">
            <div class="left">
              <h1>The Top Photos</h1>
              <p>
                At The Top Photos, We keep your perfect memories alive Over 1.9
                million+ high quality stock images shared by our talented
                community.
              </p>

              <div class="search">
                <div class="input">
                  <button>
                    <i class="mdi mdi-magnify"></i>
                  </button>
                  <input type="text" placeholder="Search blog" />
                </div>
              </div>
            </div>
            <div class="right"></div>
          </div>
        </div>
      </div>

      <div v-if="view_blog_visibility == false" class="blogs">
        <div v-for="(blog, index) in display_gallery" :key="index" class="card">
          <div class="card_head">
            <vs-button class="button" icon>
              <span
                v-show="blog.like != 0"
                style="margin-top: -0.2em; margin-right: 0.5em"
                class="span"
              >
                {{ blog.like }}
              </span>
              <i class="mdi mdi-heart-outline"></i>
            </vs-button>
          </div>
          <div @click="preview_blog(blog)" class="image">
            <img
              :src="blog.article_image[0]"
              alt=""
              class="sample_img"
            />
          </div>
          <div class="foot">
            <vs-avatar class="avatar" circle>
              <img :src="blog.author_image[0]" alt="" />
            </vs-avatar>
            <div class="text">
              <h1>{{ blog.article_title }}</h1>
              <p v-html="blog.article_text.slice(0, 50) + '...'"></p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="view_blog_visibility == false" class="render_cards_foot">
        <div class="cont">
          <vs-button @click="perPage += 10" class="cont_button" block>
            Load More
            <template #animate>
              <i class="mdi mdi-reload"></i>
            </template>
          </vs-button>
        </div>
      </div>

      <div v-if="view_blog_visibility == true" class="preview_blog_post">
        <div v-for="(blog, index) in selected_blog" :key="index" class="preview_blog_post_content">
          <div class="navigate">
            <vs-button @click="view_blog_visibility = false" style="padding: 0 1em" class="button" primary> Back </vs-button>
          </div>

          <div class="title">
            <h1>{{ blog.article_title }}</h1>
          </div>

          <div class="image">
            <img :src="blog.article_image" alt="" />
          </div>

          <div class="info">
            <div class="author">
              <vs-avatar class="avatar">
                <img :src="blog.author_image" alt="" />
              </vs-avatar>

              <p>{{ blog.author_name }}</p>
            </div>

            <div class="date">
              <i class="mdi mdi-calendar"></i>
              <p>Posted on: <span>{{ blog.timestamp }}</span></p>
            </div>
          </div>

          <div class="texts">
            <blockquote v-html="blog.article_text"></blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  data: () => ({
    page: 1,
    perPage: 50,
    pages: [],
    new_blogs: [],
  }),

  watch: {
    copies() {
      this.setPages();
    },
  },

  created() {
    this.get_blogs();
  },

  methods: {
    ...mapActions(["get_blogs"]),

    ...mapMutations(["preview_blog"]),

    setPages() {
      let number_of_pages = Math.ceil(
        this.$store.getters.blogs.length / this.perPage
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

  computed: {
    ...mapGetters(["blogs", "selected_blog"]),

    ...mapState(["view_blog_visibility"]),

    display_gallery() {
      return this.paginate(
        this.$store.getters.blogs.sort(function () {
          return 0.5 - Math.random();
        })
      );
    },

    view_blog_visibility: {
      get() {
        return this.$store.state.view_blog_visibility;
      },
      set(new_value) {
        this.$store.state.view_blog_visibility = new_value;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/addons/icon/css/materialdesignicons.min.css";
@import "../assets/style/blog.css";
</style>