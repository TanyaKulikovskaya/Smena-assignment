import Vue from "vue";
import VueRouter from "vue-router";

const User = () => import("../views/user");
const Login = () => import("../views/login");
const Register = () => import("../views/register");

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "user",
    component: User,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.is_logged_in) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    if (!store.getters.is_logged_in) {
      next();
    } else {
      next({ name: "user" });
    }
  }
});

export default router;
