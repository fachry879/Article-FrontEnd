<template>
  <div class="container p-5 mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card px-5 py-5 shadow p-3 mb-5 bg-body-tertiary rounded border-0">
          <div class="card-body">
            <h3 class="card-title text-center mb-5">Login</h3>
            <form v-on:submit.prevent="submitLogin">
              <div class="form-floating mb-3">
                <input type="email" v-bind:class="{ 'form-control': true, 'is-invalid': errValidation.email }" id="floatingInput" placeholder="name@example.com" autocomplete="off" v-model="formData.email" />
                <label for="floatingInput">Email address</label>
                <div v-bind:class="{ 'alert alert-danger': true, 'd-none': !errValidation.email, 'mt-1': true }" role="alert">
                  {{ errValidation.email }}
                </div>
              </div>
              <div class="form-floating">
                <input type="password" v-bind:class="{ 'form-control': true, 'is-invalid': errValidation.password }" id="floatingPassword" placeholder="Password" autocomplete="off" v-model="formData.password" />
                <label for="floatingPassword">Password</label>
                <div v-bind:class="{ 'alert alert-danger': true, 'd-none': !errValidation.password, 'mt-1': true }" role="alert">
                  {{ errValidation.password }}
                </div>
              </div>
              <div class="d-grid gap-2 mt-5">
                <button class="btn btn-primary" type="submit"><i class="bi bi-box-arrow-in-right"></i> Login</button>
              </div>
            </form>
            <p class="mt-4 text-center">
              Don't have account ?

              <router-link :to="{ name: 'Register' }" class="link-offset-2 link-underline link-underline-opacity-0">Register Here</router-link>
            </p>
            <p class="text-center">
              Back to
              <router-link :to="{ name: 'Home' }" class="link-offset-2 link-underline link-underline-opacity-0">Home</router-link>
            </p>
          </div>
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
      token: "",
      fullNameUser: "",
      formData: {
        email: "",
        password: "",
      },
      errValidation: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitLogin() {
      Swal.fire({
        title: "Login In ...",
        html: "Please wait ...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      axios
        .post(API + "/user/login", this.formData)
        .then((response) => {
          if (response.data.status === "error") {
            Swal.fire({
              icon: "error",
              text: response.data.message,
              timer: 2500,
            });
            this.errValidation.email = response?.data?.data?.email;
            this.errValidation.password = response?.data?.data?.password;
          } else if (response.data.status === "success") {
            // console.log(response.data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id_user", response.data.id_user);
            Swal.fire({
              icon: "success",
              text: response.data.message,
              timer: 2000,
            });
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
