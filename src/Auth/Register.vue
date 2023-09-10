<template>
  <div class="container p-5 mt-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="card px-5 py-5 shadow p-3 mb-5 bg-body-tertiary rounded border-0">
          <div class="card-body">
            <h3 class="card-title text-center mb-5">Register</h3>
            <form v-on:submit.prevent="submitRegister">
              <div class="form-floating mb-3">
                <input type="text" v-bind:class="{ 'form-control': true, 'is-invalid': errValidation.fullName }" id="floatingInputValue" placeholder="John Doe" v-model="formData.full_name" />
                <label for="floatingInputValue">Full Name</label>
                <div v-bind:class="{ 'alert alert-danger': true, 'd-none': !errValidation.fullName, 'mt-1': true }" role="alert">
                  {{ errValidation.fullName }}
                </div>
              </div>
              <div class="form-floating mb-3">
                <input type="email" v-bind:class="{ 'form-control': true, 'is-invalid': errValidation.email }" id="floatingInput" placeholder="name@example.com" autocomplete="off" v-model="formData.email" />
                <label for="floatingInput">Email address</label>
                <div v-bind:class="{ 'alert alert-danger': true, 'd-none': !errValidation.email, 'mt-1': true }" role="alert">
                  {{ errValidation.email }}
                </div>
              </div>
              <div class="form-floating mb-3">
                <input type="password" v-bind:class="{ 'form-control': true, 'is-invalid': errValidation.password }" id="floatingPassword" placeholder="Password" autocomplete="off" v-model="formData.password" />
                <label for="floatingPassword">Password</label>
                <div v-bind:class="{ 'alert alert-danger': true, 'd-none': !errValidation.password, 'mt-1': true }" role="alert">
                  {{ errValidation.password }}
                </div>
              </div>
              <div class="form-floating">
                <input type="password" v-bind:class="{ 'form-control': true, 'is-invalid': errValidation.confirmPassword }" id="floatingConfirmPassword" placeholder="Password" autocomplete="off" v-model="formData.confirm_password" />
                <label for="floatingConfirmPassword">Confirm Password</label>
                <div v-bind:class="{ 'alert alert-danger': true, 'd-none': !errValidation.confirmPassword, 'mt-1': true }" role="alert">
                  {{ errValidation.confirmPassword }}
                </div>
              </div>
              <div class="d-grid gap-2 mt-5">
                <button class="btn btn-primary" type="submit"><i class="bi bi-box-arrow-in-right"></i> Register</button>
              </div>
            </form>
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
      formData: {
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      errValidation: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    submitRegister() {
      Swal.fire({
        title: "Saving Data ...",
        html: "Please wait ...",
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      axios
        .post(API + "/user/register", this.formData)
        .then((response) => {
          if (response.data.status === "error") {
            // console.log(response.data);
            Swal.fire({
              icon: "error",
              text: response.data.message,
              timer: 2500,
            });
            this.errValidation.fullName = response?.data?.data?.full_name;
            this.errValidation.email = response?.data?.data?.email;
            this.errValidation.password = response?.data?.data?.password;
            this.errValidation.confirmPassword = response?.data?.data?.confirm_password;
          } else if (response.data.status === "success") {
            Swal.fire({
              icon: "success",
              text: response.data.message,
              timer: 5000,
            });
            this.$router.push("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
