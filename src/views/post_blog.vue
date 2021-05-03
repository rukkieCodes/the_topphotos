<template>
  <div class="post_blog">
    <input
      @change="upload_image"
      ref="article_image"
      style="display: none"
      type="file"
    />
    <input
      @change="upload_authur_image"
      style="display: none"
      ref="article_author_image"
      type="file"
    />
    <div class="container">
      <div class="left">
        <div class="inputs grid">
          <div class="input3">
            <p style="margin-top: 0.5em">{{ currentDate }}</p>
          </div>
          <div class="input1">
            <vs-input v-model="post_blog.author_name" placeholder="Author name">
              <template #icon>
                <i class="mdi mdi-account"></i>
              </template>
            </vs-input>
          </div>

          <div class="input2">
            <vs-input
              v-model="post_blog.article_title"
              placeholder="Article title"
            >
              <template #icon>
                <i class="mdi mdi-format-title"></i>
              </template>
            </vs-input>
          </div>

          <div class="input5">
            <VueEditor
              class="textarea__one"
              :editorOptions="editorSettings"
              v-model="post_blog.article_text"
              placeholder="Write your message"
              id="textInput"
            />
          </div>

          <vs-button
            :loading="upload_document_loading"
            class="post_button"
            @click="save"
            block
          >
            Post article
            <template #animate>
              <i
                style="font-size: 1.2rem"
                class="mdi mdi-cloud-upload-outline"
              ></i>
            </template>
          </vs-button>
        </div>
      </div>
      <div class="right">
        <div class="right_content">
          <div class="right_left">
            <div v-show="post_blog.article_image != ''" class="image">
              <img
                v-for="image in post_blog.article_image"
                :key="image"
                :src="image"
                alt=""
              />
            </div>
            <div
              v-show="post_blog.article_image == ''"
              @click="click_article_image"
              class="image_placeholder"
            >
              <div class="text">
                <i class="mdi mdi-cloud-upload-outline"></i>
                <p>Upload article image</p>
              </div>
            </div>
          </div>
          <div class="right_right">
            <p class="post_time">
              <span>Uploaded on </span>{{ post_blog.timestamp }}
            </p>
            <div class="author">
              <vs-avatar @click="click_article_author_image">
                <img
                  v-for="image in post_blog.author_image"
                  :key="image"
                  :src="image"
                  v-show="post_blog.author_image != ''"
                  alt=""
                />
                <img v-show="post_blog.author_image == ''" src="../assets/images/tosin.jpeg" alt="" />
              </vs-avatar>
              <p class="author_name">{{ post_blog.author_name }}</p>
            </div>
            <p class="post_title">{{ post_blog.article_title }}</p>
            <div v-html="post_blog.article_text"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { VueEditor } from "vue2-editor";
import { fb, db } from "../firebase";
export default {
  data: () => ({
    currentDate: null,
    text: "",
    editorSettings: {
      theme: "bubble",
      modules: {},
    },

    post_blog: {
      author_name: "",
      article_title: "",
      article_image: [],
      author_image: [],
      like: 0,
      article_text: ``,
      timestamp: moment().format("LLLL"),
    },

    upload_document_loading: false,
  }),

  components: {
    VueEditor,
  },

  created() {
    this.expand_input();
    this.currentDate = moment().format("LLLL");
    setInterval(() => this.updateCurrentDate(), 1 * 1000);
  },

  methods: {
    expand_input() {
      const input_style = document.querySelectorAll(".inputs input");

      for (var i = 0; i < input_style.length; i++) {
        input_style[i].style.width = "100%";
      }
    },

    updateCurrentDate() {
      this.currentDate = moment().format("LLLL");
    },

    click_article_image() {
      this.$refs.article_image.click();
    },

    click_article_author_image() {
      this.$refs.article_author_image.click();
    },

    upload_authur_image(e) {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        const storage_ref = fb
          .storage()
          .ref("article_author_image/" + file.name);
        let upload_task = storage_ref.put(file);

        // this.$vs.notification({
        //   loading: true,
        //   position: "top-right",
        //   color: "success",
        //   flat: true,
        // });

        upload_task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const math = (progress * 100) / 100;
            const calc = Math.round(math);
            console.log("Upload is " + calc + "% done");
            // this.progress = calc;
          },
          (error) => {
            console.log(error);
          },
          () => {
            upload_task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.post_blog.author_image.push(downloadURL);
              // this.progress_visibility = false;
              console.log("File upload at:", downloadURL);
              // this.$vs.notification({
              //   title: "Image upload was successful",
              //   position: "top-right",
              //   color: "success",
              //   flat: true,
              // });
            });
          }
        );
      }
    },

    upload_image(e) {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        const storage_ref = fb.storage().ref("article_images/" + file.name);
        let upload_task = storage_ref.put(file);

        // this.$vs.notification({
        //   loading: true,
        //   position: "top-right",
        //   color: "success",
        //   flat: true,
        // });

        upload_task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const math = (progress * 100) / 100;
            const calc = Math.round(math);
            console.log("Upload is " + calc + "% done");
            // this.progress = calc;
          },
          (error) => {
            console.log(error);
            // this.progress_visibility = false;
          },
          () => {
            upload_task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.post_blog.article_image.push(downloadURL);
              // this.progress_visibility = false;
              console.log("File upload at:", downloadURL);
              // this.$vs.notification({
              //   title: "Image upload was successful",
              //   position: "top-right",
              //   color: "success",
              //   flat: true,
              // });
            });
          }
        );
      }
    },

    save() {
      this.upload_document_loading = true;

      db.collection("post_article")
        .add(this.post_blog)
        .then((data) => {
          console.log(data.id);
          this.upload_document_loading = false;
          // this.gallery = {
          //   category: "",
          //   like: null,
          //   client_name: "",
          //   rating: null,
          //   sample_image: [],
          //   author_image: [],
          // };
        })
        .catch((error) => {
          console.error(error);
          this.upload_document_loading = false;
        });
    },
  },

  mounted() {
    this.expand_input();
  },
};
</script>

<style lang="scss" scoped>
@import url(../assets/addons/icon/css/materialdesignicons.min.css);
@import "../assets/style/post_blog.css";
@import url("../assets/addons/quill.bubble.css");
</style>