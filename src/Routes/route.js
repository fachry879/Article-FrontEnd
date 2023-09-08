//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a route
import HomeArticle from "../Article/HomeArticle.vue";
import CreateArticle from "../Article/CreateArticle.vue";
import Editarticle from "../Article/Editarticle.vue";

const routes = [
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
    path: "/article/edit/:id",
    name: "Edit Article",
    component: Editarticle,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
