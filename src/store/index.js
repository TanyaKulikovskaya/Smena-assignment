import Vue from "vue";
import Vuex from "vuex";
import UserService from "../services/UserService";

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
    LOGIN_SUCCESS(state, token) {
      state.token = token;
    },
    LOGIN_FAILURE(state) {
      state.token = "";
    },
    SET_LOGOUT(state) {
      UserService.logout();
      state.token = "";
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      return UserService.login(username, password).then(
        (response) => {
          commit("LOGIN_SUCCESS", response.token);
          return Promise.resolve(response.token);
        },
        (error) => {
          commit("LOGIN_FAILURE");
          return Promise.reject(error);
        }
      );
    },
    getUser({ commit }) {
      return UserService.getUser().then(
        (response) => {
          return Promise.resolve(response.data);
        },
        (error) => {
          commit("SET_LOGOUT");
          return Promise.reject(error);
        }
      );
    },
  },
});
