<script setup>
import axios from "axios";
import { ref } from "vue";
import { API } from "../Config/Config";

const formData = {
  category: "",
  title: "",
  content: "",
};

const header = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const saveArticle = async () => {
  await axios
    .post(API + "/article/create", formData)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
</script>

<template>
  <div class="p-5 mb-4" id="app">
    <div class="container">
      <p class="display-5 mb-3">Create New Article</p>
      <form v-on:submit.prevent="saveArticle">
        <div class="form-floating mb-3">
          <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="formData.category">
            <option selected disabled>Select Category . . .</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <label for="floatingSelect">Category</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" placeholder="Article Title" v-model="formData.title" />
          <label for="floatingInput">Title</label>
        </div>
        <div class="form-floating mb-3">
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height: 100px" v-model="formData.content" />
          <label for="floatingTextarea">Content</label>
        </div>
        <button type="submit" class="btn btn-primary"><i class="bi bi-save2"></i> Save</button>
      </form>
    </div>
  </div>
</template>
