<template>
  <div class="edit_gallery">
    <div class="edit_head">
      <div class="input">
        <button>
          <i class="mdi mdi-magnify"></i>
        </button>
        <input type="text" placeholder="Search" />
      </div>

      <div
        v-for="(photo, index) in previewed_image"
        :key="index"
        class="edit_ph"
        v-show="edit_image_visibility == true"
      >
        <div class="left">
          <div id="img" class="img">
            <div
              v-for="(image, index) in photo.sample_image"
              :key="index"
              class="card"
            >
              <img :src="image" id="sample_img" alt="" />
              <div class="overlay">
                <vs-button
                  @click="delete_iamge(photo, image, index)"
                  class="button"
                  danger
                  flat
                  icon
                >
                  <i class="mdi mdi-trash-can"></i>
                </vs-button>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="inputs grid">
            <vs-row justify="space-between">
              <vs-col w="12">
                <vs-input
                  v-model="photo.client_name"
                  primary
                  placeholder="Client name"
                >
                  <template #icon>
                    <i class="mdi mdi-circle-edit-outline"></i>
                  </template>
                </vs-input>
              </vs-col>
              <vs-col style="margin-top: 1em" w="12">
                <vs-input
                  v-model="photo.category"
                  primary
                  placeholder="Image category"
                >
                  <template #icon>
                    <i class="mdi mdi-circle-edit-outline"></i>
                  </template>
                </vs-input>
              </vs-col>
              <vs-col style="margin-top: 1em" w="12">
                <vs-input
                  v-model="photo.name"
                  primary
                  placeholder="Author name"
                >
                  <template #icon>
                    <i class="mdi mdi-circle-edit-outline"></i>
                  </template>
                </vs-input>
              </vs-col>
              <vs-col style="margin-top: 1em" w="5">
                <vs-button
                  @click="update_photo(photo)"
                  style="font-weight: 400"
                  primary
                  block
                >
                  save changes
                  <template #animate>
                    <i class="mdi mdi-lead-pencil"></i>
                  </template>
                </vs-button>
              </vs-col>
              <vs-col style="margin-top: 1em" w="5">
                <vs-button
                  @click="delete_photo(photo.id)"
                  style="font-weight: 400"
                  danger
                  block
                >
                  Delete instead
                  <template #animate>
                    <i class="mdi mdi-trash-can-outline"></i>
                  </template>
                </vs-button>
              </vs-col>
              <vs-col w="12">
                <vs-button
                  @click="edit_image_visibility == false"
                  style="font-weight: 400"
                  dark
                  block
                >
                  close
                  <template #animate>
                    <i class="mdi mdi-trash-can-outline"></i>
                  </template>
                </vs-button>
              </vs-col>
            </vs-row>
          </div>
        </div>
      </div>
    </div>
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
            @click="preview_image_edit(photo)"
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
        <vs-button @click="perPage += 10" class="cont_button" block>
          Load More
          <template #animate>
            <i class="mdi mdi-reload"></i>
          </template>
        </vs-button>
      </div>
    </div>
    <Preview_image />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import Preview_image from "../components/preview_image_edit.vue";
import { fb, db } from "../firebase";
export default {
  data: () => ({
    page: 1,
    perPage: 50,
    pages: [],
    new_photos: [],
  }),

  components: {
    Preview_image,
  },

  watch: {
    copies() {
      this.setPages();
    },
  },

  beforeCreate() {
    const input_style = document.querySelectorAll(".inputs input");

    for (var i = 0; i < input_style.length; i++) {
      input_style[i].style.width = "100%";
    }

    if (this.$store.state.edit_image_visibility == true) {
      const editable_image = document.querySelectorAll("#sample_img");

      if (editable_image.length <= 1) {
        document.querySelector("#img").classList.add("remove_layout");
      } else {
        document.querySelector("#img").classList.remove("remove_layout");
      }
    }
  },

  updated() {
    const input_style = document.querySelectorAll(".inputs input");

    for (var i = 0; i < input_style.length; i++) {
      input_style[i].style.width = "100%";
    }

    if (this.$store.state.edit_image_visibility == true) {
      const editable_image = document.querySelectorAll("#sample_img");

      if (editable_image.length <= 1) {
        document.querySelector("#img").classList.add("remove_layout");
      } else {
        document.querySelector("#img").classList.remove("remove_layout");
      }
    }
  },

  created() {
    this.get_photos();

    if (this.$store.state.edit_image_visibility == true) {
      const editable_image = document.querySelectorAll("#sample_img");

      if (editable_image.length <= 1) {
        document.querySelector("#img").classList.add("remove_layout");
      } else {
        document.querySelector("#img").classList.remove("remove_layout");
      }
    }
  },

  methods: {
    ...mapActions(["get_photos"]),

    ...mapMutations(["preview_image_edit"]),

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

    delete_photo(doc) {
      db.collection("top_gallery")
        .doc(doc)
        .delete()
        .then((data) => {
          console.log("Document deleted", data);
        })
        .catch((error) => {
          console.log("Error deleting: ", error);
        });
    },

    update_photo(doc) {
      console.log(doc);
      db.collection("top_gallery")
        .doc(doc.id)
        .update({
          category: doc.category,
          client_name: doc.client_name,
          name: doc.name,
        })
        .then((data) => {
          console.log("Document updatated: ", data);
          this.edit_image_visibility = false;
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },

    delete_iamge(photo, image, index) {
      console.log(image);
      console.log(index);

      let my_image = fb.storage().refFromURL(image);

      photo.sample_image.splice(index, 1);
      my_image
        .delete()
        .then((data) => {
          console.log("Image deleted", data);
        })
        .catch((error) => {
          console.log("Error deleting image", error);
        });
    },
  },

  mounted() {
    const input_style = document.querySelectorAll(".inputs input");

    for (var i = 0; i < input_style.length; i++) {
      input_style[i].style.width = "100%";
    }

    if (this.$store.state.edit_image_visibility == true) {
      const editable_image = document.querySelectorAll("#sample_img");

      if (editable_image.length <= 1) {
        document.querySelector("#img").classList.add("remove_layout");
      } else {
        document.querySelector("#img").classList.remove("remove_layout");
      }
    }
  },

  computed: {
    ...mapGetters(["photos", "previewed_image"]),

    ...mapState(["edit_image_visibility"]),

    display_gallery() {
      return this.paginate(
        this.$store.getters.photos.sort(function () {
          return 0.5 - Math.random();
        })
      );
    },

    edit_image_visibility: {
      get() {
        return this.$store.state.edit_image_visibility;
      },
      set(new_value) {
        this.$store.state.edit_image_visibility = new_value;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(../assets/addons/icon/css/materialdesignicons.min.css);
@import "../assets/style/edit_gallery.css";

.remove_layout {
  column-count: initial;
  column-gap: initial;
  gap: initial;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>