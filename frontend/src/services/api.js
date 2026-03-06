import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-lite-n9dq.onrender.com",
});

export default api;
