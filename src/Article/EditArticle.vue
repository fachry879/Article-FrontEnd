<template>
  <div class="p-5 mb-4" id="app">
    <div class="container">
      <p class="display-5 mb-3">Edit Article</p>
      <form v-on:submit.prevent="updateArticle">
        <div class="form-floating mb-3">
          <select v-bind:class="{ 'form-select': true, 'is-invalid': errValidation.category }" id="floatingSelect" aria-label="Floating label select example" v-model="formData.category">
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
  beforeMount() {
    if (!localStorage.getItem("token")) {
      Swal.fire({
        title: "Can't edit Article",
        text: "Please login first before edit Article",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.push("/login");
        } else {
          this.$router.push("/");
        }
      });
    }
  },
  created() {
    //get data article
    axios
      .get(API + `/article/data/${this.idParam}`)
      .then((response) => {
        // console.log(response.data[0]);
        this.formData = response.data[0];
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
        .put(API + `/article/update/${this.idParam}`, this.formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
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
            this.$router.push({
              name: "Detail Article",
              params: { id: this.idParam },
            });
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
