<script setup></script>

<template>
  <div class="p-5 mb-4">
    <div class="container">
      <p class="fs-1">{{ article.title }}</p>
      <p class="fs-5 text-secondary">{{ article.publish_date }}</p>
      <p class="fs-3">{{ article.content }}</p>
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
      .get(API + `/article/data/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.article = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
