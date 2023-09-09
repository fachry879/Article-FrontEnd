<template>
  <div class="p-5 mb-4">
    <div class="container">
      <div class="row mb-3">
        <div class="col-6">
          <p class="fs-2">Article</p>
        </div>
        <div class="col-6">
          <router-link :to="{ name: 'Create Article' }" class="btn btn-sm btn-success float-end"><i class="bi bi-plus-circle"></i> New Article</router-link>
        </div>
      </div>
      <p v-if="empty === true && isLoading === true" class="text-center fs-5 mt-5">Oopss! No article found, please create new Article first.</p>
      <p v-if="isLoading === false" class="text-center fs-5 mt-5">Loading Article . . .</p>
      <div class="card mb-3" v-for="data in article" :key="data.id">
        <div class="card-body">
          <h5 class="card-title">{{ data.title }}</h5>
          <p class="card-text">{{ data.content }}</p>
          <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          <router-link :to="{ name: 'Detail Article', params: { id: data.id } }" class="btn btn-sm btn-primary">See Article <i class="bi bi-chevron-right"></i></router-link>
        </div>
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
      empty: true,
      isLoading: false,
    };
  },
  created() {
    axios
      .get(API + "/article/list")
      .then((response) => {
        if (response.data.status === "error") {
          // console.log(response.data);
          this.isLoading = true;
        } else if (response.data.status === "success") {
          this.article = response.data.data;
          this.empty = false;
          this.isLoading = true;
        }
      })
      .catch((error) => {
        this.isLoading = true;
        console.log(error);
      });
  },
};
</script>
