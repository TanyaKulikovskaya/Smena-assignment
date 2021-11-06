import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
  },
  getters: {
    is_logged_in(state) {
      return !!state.token;
    },
  },
  mutations: {
    AUTH_SUCCESS(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      const response = await axios.post(API_BASE_URL + "/login", {
        username: credentials.username,
        password: credentials.password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      commit("AUTH_SUCCESS", token);
    },
    async register({commit}, credentials) {
      const response = await axios.post(API_BASE_URL + "/register", {
        username: credentials.username,
        password: credentials.password,
      })

    },
  },
});
