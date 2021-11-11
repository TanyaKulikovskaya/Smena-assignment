import axios from "axios";
import authHeader from "./AuthHeader";

const HTTP = axios.create({
  baseURL: process.env.API_BASE_URL || "http://localhost:8080",
});

export default {
  async login(username, password) {
    const response = await HTTP.post("/login", {
      username: username,
      password: password,
    });
    if (response.data.token) {
      const token = response.data.token;
      localStorage.setItem("token", token);
    }
    return response.data;
  },
  logout() {
    localStorage.removeItem("token");
  },
  async register({ username, password }) {
    const response = await HTTP.post("/register", {
      username: username,
      password: password,
    });
    return response.data;
  },
  async getUser() {
    const response = await HTTP.get("/about", { headers: authHeader() });
    return response.data;
  },
};
