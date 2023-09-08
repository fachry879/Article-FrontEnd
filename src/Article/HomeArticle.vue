<script setup>
import { ref, onMounted } from "vue";
import { API } from "../Config/Config";
import axios from "axios";

const header = {
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
};

const listArticle = ref([]);

const fetchArticle = async () => {
  await axios
    .get(API + "/article/list", header)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

onMounted(() => {
  fetchArticle();
});
</script>

<template>
  <div class="p-5 mb-4 bg-light">
    <div class="container-fluid">
      <h1 class="display-5 fw-bold">Index page</h1>
      <p class="col-md-8 fs-4">List Article</p>
    </div>
  </div>
</template>
