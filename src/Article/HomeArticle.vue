<template>
  <div class="p-5 mb-4">
    <div class="container">
      <div class="card mb-3" v-for="article in article" :key="article.id">
        <div class="card-body">
          <h5 class="card-title">{{ article.title }}</h5>
          <p class="card-text">{{ article.content }}</p>
          <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          <router-link :to="{ name: 'Detail Article', params: { id: article.id } }" class="btn btn-primary">Detail Article</router-link>
        </div>
        <div class="card-footer text-body-secondary">{{ article.publish_date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "../Config/Config";

export default {
  data() {
    return {
      article: {},
    };
  },
  created() {
    axios
      .get(API + "/article/list")
      .then((response) => {
        this.article = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
