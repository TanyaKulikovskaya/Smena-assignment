import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    user: {},
    is_error_getting_user: false,
    error_getting_user_message: "",
  },
  getters: {
    is_logged_in(state) {
      return !!state.token;
    },
    user(state) {
      return state.user;
    },
    is_error_getting_user(state) {
      return state.is_error_getting_user;
    },
    error_getting_user_message(state) {
      return state.error_getting_user_message;
    },
  },
  mutations: {
    AUTH_SUCCESS(state, token) {
      state.token = token;
    },
    SET_LOGOUT(state) {
      state.token = "";
      state.is_error_getting_user = false;
      state.error_getting_user_message = "";
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TRUE_IS_ERROR_GETTING_USER(state, payload) {
      state.is_error_getting_user = payload;
    },
    SET_ERROR_GETTING_USER_MESSAGE(state, message) {
      state.error_getting_user_message = message;
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
    async register(context, credentials) {
      const response = await axios.post(API_BASE_URL + "/register", {
        username: credentials.username,
        password: credentials.password,
      });
      return response;
    },
    logout({ commit }) {
      commit("SET_LOGOUT");
    },
    async getUser({ commit }) {
      try {
        const { data } = await axios.get(API_BASE_URL + "/about");
        commit("SET_USER", data.data);
      } catch (error) {
        commit("SET_LOGOUT");
        commit("SET_TRUE_IS_ERROR_GETTING_USER", true);
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          commit("SET_ERROR_GETTING_USER_MESSAGE", error.response.data.message);
        } else {
          commit("SET_ERROR_GETTING_USER_MESSAGE", "Ошибка сервера");
        }
      }
    },
  },
});
