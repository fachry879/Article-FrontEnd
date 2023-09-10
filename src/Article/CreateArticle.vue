<template>
  <div class="p-5 mb-4" id="app">
    <div class="container">
      <p class="display-5 mb-3">Create New Article</p>
      <form v-on:submit.prevent="saveArticle">
        <div class="form-floating mb-3">
          <select v-bind:class="{ 'form-control': true, 'is-invalid': errValidation.category }" id="floatingSelect" aria-label="Floating label select example" v-model="formData.category">
            <option selected disabled>Select Category . . .</option>
            <option v-for="categories in listCategory" :key="categories.id" :value="categories.id">{{ categories.name }}</option>
          </select>
          <label for="floatingSelect">Category</label>
          <div v-bind:class="{ 'alert alert-danger': true, 'd-none': !errValidation.category, 'mt-1': true }" role="alert">
            {{ errValidation.category }}
          </div>
        </div>
        <div class="form-floating mb-3">
          <input type="text" v-bind:class="{ 'form-control': true, 'is-invalid': errValidation.title }" id="floatingInput" placeholder="Article Title" v-model="formData.title" />
          <label for="floatingInput">Title</label>
          <div v-bind:class="{ 'alert alert-danger': true, 'd-none': !errValidation.title, 'mt-1': true }" role="alert">
            {{ errValidation.title }}
          </div>
        </div>
        <div class="form-floating mb-3">
          <textarea v-bind:class="{ 'form-control': true, 'is-invalid': errValidation.content }" placeholder="Leave a comment here" id="floatingTextarea" style="height: 100px" v-model="formData.content" />
          <label for="floatingTextarea">Content</label>
          <div v-bind:class="{ 'alert alert-danger': true, 'd-none': !errValidation.content, 'mt-1': true }" role="alert">
            {{ errValidation.content }}
          </div>
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
      listCategory: {},
      formData: {
        category: "",
        title: "",
        content: "",
      },
      errValidation: {
        category: "",
        title: "",
        content: "",
      },
    };
  },
  created() {
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
    saveArticle() {
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
        .post(API + "/article/create", this.formData)
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
            // console.log(response);
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
