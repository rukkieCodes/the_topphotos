<template>
  <div class="upload">
    <div class="container">
      <div class="auth_img">
        <vs-avatar @click="click_file2" class="auth_img_avatar">
          <img
            v-for="image in gallery.author_image"
            :key="image"
            :src="image"
            v-show="gallery.author_image != ''"
          />
          <img
            v-show="gallery.author_image == ''"
            src="../assets/logo.png"
            alt=""
          />
        </vs-avatar>
        <p>Upload author image</p>
      </div>

      <div v-show="gallery.sample_image == ''" @click="click_file" class="img">
        <div class="texts">
          <i class="mdi mdi-cloud-upload-outline"></i>
          <p>Upload Client Image</p>
        </div>
      </div>
      <div v-show="gallery.sample_image != ''" class="img_card">
        <div @click="click_file" class="add_more card">
          <i class="mdi mdi-plus-circle-outline"></i>
        </div>

        <img
          class="card"
          v-for="image in gallery.sample_image"
          :key="image"
          :src="image"
          alt=""
        />
      </div>

      <input
        id="file"
        style="display: none"
        accept="image/x-png,image/gif,image/jpeg"
        type="file"
        multiple
        @change="upload_image"
      />
      <input
        id="file2"
        style="display: none"
        accept="image/x-png,image/gif,image/jpeg"
        type="file"
        @change="upload_authur_image"
      />

      <div class="inputs">
        <vs-input
          v-model="gallery.category"
          class="input"
          placeholder="Category"
          primary
        >
          <template #icon>
            <i class="mdi mdi-dog-service"></i>
          </template>
        </vs-input>

        <vs-input
          v-model="gallery.name"
          class="input"
          placeholder="Author Name"
          primary
        >
          <template #icon>
            <i class="mdi mdi-camera"></i>
          </template>
        </vs-input>

        <vs-input
          v-model="gallery.client_name"
          class="input"
          placeholder="Client Name"
          primary
        >
          <template #icon>
            <i class="mdi mdi-account-child-outline"></i>
          </template>
        </vs-input>

        <vs-button
          :loading="upload_document_loading"
          @click="save"
          class="input"
          block
          primary
        >
          Upload
          <template #animate>
            <i class="mdi mdi-cloud-upload-outline"></i>
          </template>
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "Upload",

  data: () => ({
    gallery: {
      category: "",
      like: 1,
      name: "",
      client_name: "",
      rating: 1,
      available: "Available to work",
      sample_image: [],
      author_image: [],
      timestamp: new Date(),
    },

    upload_document_loading: false,

    progress: 25,

    progress_visibility: false,
  }),

  methods: {
    click_file() {
      document.querySelector("#file").click();
    },

    click_file2() {
      document.querySelector("#file2").click();
    },

    upload_image(e) {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        const storage_ref = fb.storage().ref("gallery/" + file.name);
        let upload_task = storage_ref.put(file);

        this.$vs.notification({
          loading: true,
          position: "top-right",
          color: "success",
          flat: true,
        });

        upload_task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const math = (progress * 100) / 100;
            const calc = Math.round(math);
            console.log("Upload is " + calc + "% done");
            this.progress = calc;
          },
          (error) => {
            console.log(error);
            this.progress_visibility = false;
          },
          () => {
            upload_task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.gallery.sample_image.push(downloadURL);
              this.progress_visibility = false;
              console.log("File upload at:", downloadURL);
              this.$vs.notification({
                title: "Image upload was successful",
                position: "top-right",
                color: "success",
                flat: true,
              });
            });
          }
        );
      }
    },

    upload_authur_image(e) {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        const storage_ref = fb.storage().ref("gallery/" + file.name);
        let upload_task = storage_ref.put(file);

        this.$vs.notification({
          loading: true,
          position: "top-right",
          color: "success",
          flat: true,
        });

        upload_task.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            const math = (progress * 100) / 100;
            const calc = Math.round(math);
            console.log("Upload is " + calc + "% done");
            this.progress = calc;
          },
          (error) => {
            console.log(error);
          },
          () => {
            upload_task.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.gallery.author_image.push(downloadURL);
              this.progress_visibility = false;
              console.log("File upload at:", downloadURL);
              this.$vs.notification({
                title: "Image upload was successful",
                position: "top-right",
                color: "success",
                flat: true,
              });
            });
          }
        );
      }
    },

    save() {
      this.upload_document_loading = true;

      db.collection("top_gallery")
        .add(this.gallery)
        .then((data) => {
          console.log(data.id);
          this.upload_document_loading = false;
          this.gallery = {
            category: "",
            like: null,
            client_name: "",
            rating: null,
            sample_image: [],
            author_image: [],
          };
        })
        .catch((error) => {
          console.error(error);
          this.upload_document_loading = false;
        });
    },
  },

  mounted() {
    const input_style = document.querySelectorAll(
      ".upload .container .inputs input"
    );

    for (var i = 0; i < input_style.length; i++) {
      input_style[i].style.width = "100%";
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/addons/icon/css/materialdesignicons.min.css";
@import "../assets/style/upload.scss";
</style>