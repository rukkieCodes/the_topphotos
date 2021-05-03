<template>
  <div class="preview_image center">
    <vs-dialog
      blur
      auto-width
      prevent-close
      scroll
      overflow-hidden
      v-model="preview_image_edit"
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
        <div style="margin-top: 1em" class="footer-dialog grid">
          <vs-row justify="space-between">
            <vs-col w="5">
              <vs-button @click="open_edit_photo(photo)" style="font-weight: 400" primary block>
                Edit
                <template #animate>
                  <i class="mdi mdi-image-edit-outline"></i>
                </template>
              </vs-button>
            </vs-col>
            <vs-col w="5">
              <vs-button @click="delete_photo(photo.id)" style="font-weight: 400" danger block>
                Delete
                <template #animate>
                  <i class="mdi mdi-trash-can-outline"></i>
                </template>
              </vs-button>
            </vs-col>
          </vs-row>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { fb, db } from "../firebase";
export default {
  data: () => ({
    active: false,
    input1: "",
    input2: "",
    checkbox1: false,
  }),

  methods: {
    ...mapMutations(["open_edit_photo"]),

    delete_photo(doc) {
      console.log(doc)
      db.collection("top_gallery")
        .doc(doc)
        .delete()
        .then((data) => {
          console.log("Document deleted", data);
          this.preview_image_edit = false
        })
        .catch((error) => {
          console.log("Error deleting: ", error);
          this.preview_image_edit = false
        });
    },
  },

  computed: {
    ...mapState(["preview_image_edit"]),

    ...mapGetters(["previewed_image"]),

    preview_image_edit: {
      get() {
        return this.$store.state.preview_image_edit;
      },
      set(new_value) {
        this.$store.state.preview_image_edit = new_value;
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