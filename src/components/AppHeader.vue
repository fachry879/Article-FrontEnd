<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand">Home</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <!-- <router-link :to="{ name: 'Create Article' }" class="nav-link" aria-current="page">Create Article</router-link> -->
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" role="search">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> {{ name }} </a>
            <ul class="dropdown-menu">
              <router-link :to="{ name: 'Login' }" class="dropdown-item" v-if="!isLogin">Login</router-link>
              <li><a class="dropdown-item" href="#" v-on:click="userLogout" v-if="isLogin">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { API } from "../Config/Config";

export default {
  data() {
    return {
      name: "Guest",
      isLogin: false,
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      if (localStorage.getItem("id_user")) {
        axios
          .get(API + `/user/profile/${localStorage.getItem("id_user")}`)
          .then((response) => {
            // console.log(response.data);
            this.name = response.data.full_name;
            this.isLogin = true;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  },
  methods: {
    userLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("id_user");
      this.isLogin = false;
      this.$router.go(0);
    },
  },
};
</script>
