//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a route
import Login from "../Auth/Login.vue";
import Register from "../Auth/Register.vue";

import HomeArticle from "../Article/HomeArticle.vue";
import CreateArticle from "../Article/CreateArticle.vue";
import DetailArticle from "../Article/DetailArticle.vue";
import Editarticle from "../Article/EditArticle.vue";

const routes = [
  // -------------------- Auth Routes ------------------------//
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  // -------------------- End Auth Routes ------------------------//
  // -------------------- Article Routes ------------------------//
  {
    path: "/",
    name: "Home",
    component: HomeArticle,
  },
  {
    path: "/article/create",
    name: "Create Article",
    component: CreateArticle,
  },
  {
    path: "/article/detail/:id",
    name: "Detail Article",
    component: DetailArticle,
  },
  {
    path: "/article/edit/:id",
    name: "Edit Article",
    component: Editarticle,
  },
  // -------------------- End Article Routes ------------------------//
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
