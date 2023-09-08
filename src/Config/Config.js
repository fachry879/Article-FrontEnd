import axios from "axios";

const Api = axios.create({
  //set default endpoint API
  //   baseURL: "http://192.168.1.7:8000",
  baseURL: "http://localhost:8080",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default Api;
