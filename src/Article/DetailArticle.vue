<template>
  <div class="p-5 mb-4">
    <div class="container">
      <p v-if="isLoading === false" class="text-center fs-5 mt-5">Loading Article . . .</p>
      <p class="fs-1">{{ article.title }}</p>
      <p class="fs-5 text-secondary">{{ article.publish_date }}</p>
      <p class="fs-4">{{ article.content }}</p>
      <div class="row mt-3">
        <div class="col-12 align-self-center">
          <router-link :to="{ name: 'Edit Article', params: { id: idParam } }" class="btn btn-sm btn-info me-3"><i class="bi bi-pencil"></i> Edit</router-link>
          <button v-on:click="articleDelete" class="btn btn-sm btn-danger me-3"><i class="bi bi-trash3"></i> Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "../Config/Config";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      idParam: this.$route.params.id,
      article: {},
      isLoading: false,
    };
  },
  created() {
    axios
      .get(API + `/article/data/${this.idParam}`)
      .then((response) => {
        this.isLoading = true;
        this.article = response.data;
      })
      .catch((error) => {
        this.isLoading = true;
        console.log(error);
      });
  },
  methods: {
    articleDelete() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleting Data ...",
            html: "Please wait ...",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          axios
            .delete(API + `/article/delete/${this.idParam}`)
            .then((response) => {
              if (response.data.status === "error") {
                Swal.fire({
                  icon: "error",
                  title: response.data.message,
                  timer: 1500,
                });
              } else if (response.data.status === "success") {
                Swal.fire({
                  icon: "success",
                  title: response.data.message,
                  timer: 1500,
                });
                this.$router.push("/");
              }
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "An Error Occured!",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      });
    },
  },
};
</script>
