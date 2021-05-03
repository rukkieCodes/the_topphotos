import Vue from 'vue'
import Vuex from 'vuex'
import {
  fb,
  db
} from "../firebase.js"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: false,

  state: {
    photos: [],
    preview_image: false,
    preview_image_edit: false,
    edit_photo: false,
    previewed_image: [],
    edit_image_visibility: false,
    blogs: [],
    view_blog_visibility: false,
    selected_blog: [],
    stories: [],
    view_story_visibility: false,
    selected_story: [],
  },

  getters: {
    photos: state => state.photos,
    previewed_image: state => state.previewed_image,
    blogs: state => state.blogs,
    selected_blog: state => state.selected_blog,
    stories: state => state.stories,
    selected_story: state => state.selected_story,
  },

  mutations: {
    preview_image: (state, photo) => {
      state.preview_image = true;
      state.previewed_image = [];
      state.previewed_image.push(photo)
      console.log(photo)
    },

    preview_image_edit: (state, photo) => {
      state.preview_image_edit = true;
      state.previewed_image = [];
      state.previewed_image.push(photo)
      console.log(photo)
    },

    open_edit_photo: (state, photo) => {
      state.preview_image_edit = false;
      state.edit_image_visibility = true;
      state.previewed_image = [];
      state.previewed_image.push(photo)
      console.log(photo)
    },

    preview_blog: (state, blog) => {
      state.selected_blog = []
      state.view_blog_visibility = true
      state.selected_blog.push(blog)
      console.log(blog);
      return state;
    },

    preview_story: (state, story) => {
      state.selected_story = []
      state.view_story_visibility = true
      state.selected_story.push(story)
      console.log(story);
      return state;
    },
  },

  actions: {
    get_photos() {
      this.state.photos = [];
      db.collection("top_gallery")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.state.photos.push({
              id: doc.id,
              author_image: doc.data().author_image,
              available: doc.data().available,
              category: doc.data().category,
              client_name: doc.data().client_name,
              like: doc.data().like,
              name: doc.data().name,
              rating: doc.data().rating,
              sample_image: doc.data().sample_image,
              timestamp: doc.data().timestamp
            })
            console.log(this.state.photos)
          });
        });
    },

    get_blogs() {
      this.state.blogs = [];
      db.collection("post_article")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.state.blogs.push({
              id: doc.id,
              author_image: doc.data().author_image,
              article_image: doc.data().article_image,
              author_name: doc.data().author_name,
              article_title: doc.data().article_title,
              like: doc.data().like,
              article_text: doc.data().article_text,
              timestamp: doc.data().timestamp
            })
            console.log(this.state.blogs)
          });
        });
    },

    get_stories() {
      this.state.stories = [];
      db.collection("post_story")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.state.stories.push({
              id: doc.id,
              author_image: doc.data().author_image,
              story_image: doc.data().story_image,
              author_name: doc.data().author_name,
              story_title: doc.data().story_title,
              like: doc.data().like,
              story_text: doc.data().story_text,
              timestamp: doc.data().timestamp
            })
            console.log(this.state.stories)
          });
        });
    },
  },
  modules: {}
})