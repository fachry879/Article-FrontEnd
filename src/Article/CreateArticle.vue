<template>
  <div class="p-5 mb-4" id="app">
    <div class="container">
      <p class="display-5 mb-3">Create New Article</p>
      <form v-on:submit.prevent="saveArticle">
        <div class="form-floating mb-3">
          <select class="form-control" id="floatingSelect" aria-label="Floating label select example" v-model="formData.category">
            <option selected disabled>Select Category . . .</option>
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
      axios
        .post(API + "/article/create", this.formData)
        .then((response) => {
          if (response.data.status === "error") {
            // console.log(response.data);
            this.errValidation.category = response?.data?.message?.category;
            this.errValidation.title = response?.data?.message?.title;
            this.errValidation.content = response?.data?.message?.content;
          } else if (response.data.status === "success") {
            // console.log(response);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
