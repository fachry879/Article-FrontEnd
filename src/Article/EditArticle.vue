<template>
  <div class="p-5 mb-4" id="app">
    <div class="container">
      <p class="display-5 mb-3">Edit Article</p>
      <form v-on:submit.prevent="updateArticle">
        <div class="form-floating mb-3">
          <select class="form-control" id="floatingSelect" aria-label="Floating label select example" v-model="formData.category">
            <option v-for="categories in listCategory" :key="categories.id" :value="categories.id">{{ categories.name }}</option>
          </select>
          <label for="floatingSelect">Category</label>
          <p class="text-danger" v-if="errValidation.category !== ''">
            {{ errValidation.category }}
          </p>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" placeholder="Article Title" v-model="formData.title" />
          <label for="floatingInput">Title</label>
          <p class="text-danger" v-if="errValidation.title !== ''">
            {{ errValidation.title }}
          </p>
        </div>
        <div class="form-floating mb-3">
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height: 100px" v-model="formData.content" />
          <label for="floatingTextarea">Content</label>
          <p class="text-danger" role="alert" v-if="errValidation.content !== ''">
            {{ errValidation.content }}
          </p>
        </div>
        <button type="submit" class="btn btn-primary"><i class="bi bi-save2"></i> Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "../Config/Config";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      idParam: this.$route.params.id,
      listCategory: {},
      formData: {},
      errValidation: {
        category: "",
        title: "",
        content: "",
      },
    };
  },
  created() {
    //get data article
    axios
      .get(API + `/article/data/${this.idParam}`)
      .then((response) => {
        // console.log(response);
        this.formData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    //get list category
    axios
      .get(API + "/article/category")
      .then((response) => {
        this.listCategory = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    updateArticle() {
      Swal.fire({
        title: "Saving Data ...",
        html: "Please wait ...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      axios
        .put(API + `/article/update/${this.idParam}`, this.formData)
        .then((response) => {
          if (response.data.status === "error") {
            // console.log(response.data);
            Swal.fire({
              icon: "error",
              text: response.data.message,
              timer: 2500,
            });
            this.errValidation.category = response?.data?.data?.category;
            this.errValidation.title = response?.data?.data?.title;
            this.errValidation.content = response?.data?.data?.content;
          } else if (response.data.status === "success") {
            Swal.fire({
              icon: "success",
              text: response.data.message,
              timer: 2000,
            });
            this.$router.push("/");
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: "An error occured",
            timer: 2500,
          });
          console.log(error);
        });
    },
  },
};
</script>
