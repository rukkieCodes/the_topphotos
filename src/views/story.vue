<template>
  <div class="story">
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
                  <input type="text" placeholder="Search story" />
                </div>
              </div>
            </div>
            <div class="right"></div>
          </div>
        </div>
      </div>

      <div v-if="view_story_visibility == false" class="stories">
        <div
          v-for="(story, index) in display_gallery"
          :key="index"
          class="card"
        >
          <div class="card_head">
            <vs-button class="button" icon>
              <span
                v-show="story.like != 0"
                style="margin-top: -0.2em; margin-right: 0.5em"
                class="span"
              >
                {{ story.like }}
              </span>
              <i class="mdi mdi-heart-outline"></i>
            </vs-button>
          </div>
          <div class="image">
            <img @click="preview_story(story)" :src="story.story_image[0]" alt="" class="sample_img" />
          </div>
          <div class="foot">
            <vs-avatar class="avatar" circle>
              <img :src="story.author_image[0]" alt="" />
            </vs-avatar>
            <div class="text">
              <h1>{{ story.story_title }}</h1>
              <p v-html="story.story_text.slice(0, 50) + '...'"></p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="view_story_visibility == false" class="render_cards_foot">
        <div class="cont">
          <vs-button @click="perPage += 10" class="cont_button" block>
            Load More
            <template #animate>
              <i class="mdi mdi-reload"></i>
            </template>
          </vs-button>
        </div>
      </div>

      <div v-if="view_story_visibility == true" class="preview_story_post">
        <div
          v-for="(story, index) in selected_story"
          :key="index"
          class="preview_story_post_content"
        >
          <div class="navigate">
            <vs-button
              @click="view_story_visibility = false"
              style="padding: 0 1em"
              class="button"
              primary
            >
              Back
            </vs-button>
          </div>

          <div class="title">
            <h1>{{ story.story_title }}</h1>
          </div>

          <div class="image">
            <img :src="story.story_image" alt="" />
          </div>

          <div class="info">
            <div class="author">
              <vs-avatar class="avatar">
                <img :src="story.author_image" alt="" />
              </vs-avatar>

              <p>{{ story.author_name }}</p>
            </div>

            <div class="date">
              <i class="mdi mdi-calendar"></i>
              <p>
                Posted on: <span>{{ story.timestamp }}</span>
              </p>
            </div>
          </div>

          <div class="texts">
            <blockquote v-html="story.story_text"></blockquote>
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
  }),

  watch: {
    copies() {
      this.setPages();
    },
  },

  created() {
    this.get_stories();
  },
  methods: {
    ...mapActions(["get_stories"]),

    ...mapMutations(["preview_story"]),

    setPages() {
      let number_of_pages = Math.ceil(
        this.$store.getters.stories.length / this.perPage
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
    ...mapGetters(["stories", "selected_story"]),

    ...mapState(["view_story_visibility"]),

    display_gallery() {
      return this.paginate(
        this.$store.getters.stories.sort(function () {
          return 0.5 - Math.random();
        })
      );
    },

    view_story_visibility: {
      get() {
        return this.$store.state.view_story_visibility;
      },
      set(new_value) {
        this.$store.state.view_story_visibility = new_value;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/addons/icon/css/materialdesignicons.min.css";
@import "../assets/style/story.css";
</style>