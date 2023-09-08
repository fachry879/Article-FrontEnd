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
      console.log(response.data);
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
  <div class="p-5 mb-4">
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Article Title</h5>
          <p class="card-text">Article Content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        <div class="card-footer text-body-secondary">2 days ago</div>
      </div>
    </div>
  </div>
</template>
