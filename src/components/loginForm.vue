<template>
  <v-card class="elevation-9" min-height="380px">
    <v-toolbar dark color="primary">
      <v-toolbar-title class="mx-auto text-uppercase">Вход</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="loginForm" v-model="valid" lazy-validation>
        <v-text-field
          v-model="loginUserName"
          label="Имя пользователя"
          type="text"
          :rules="loginUserNameRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="loginPassword"
          label="Пароль"
          type="password"
          :rules="loginPasswordRules"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn min-width="180" color="primary" @click="login">Вход</v-btn>
      <v-spacer></v-spacer>
      <v-btn min-width="120" color="primary" outlined to="/register">
        Регистрация
      </v-btn>
    </v-card-actions>
    <v-card-text v-if="showLoginError" class="error--text">
      {{ loginErrorMessage }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "login-form",
  data: () => ({
    valid: false,
    loginUserName: "",
    loginPassword: "",
    loginUserNameRules: [(v) => !!v || "Введите имя пользователя"],
    loginPasswordRules: [(v) => !!v || "Введите пароль"],
    showLoginError: false,
    loginErrorMessage: "",
  }),
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
        let data = {
          username: this.loginUserName,
          password: this.loginPassword,
        };
        this.$store
          .dispatch("login", data)
          .then(() => this.$router.replace({ name: "user" }))
          .catch((error) => {
            localStorage.removeItem("token");
            this.showLoginError = true;
            if (error.response && error.response.status === 401) {
              this.loginErrorMessage = error.response.data.error;
            } else {
              this.loginErrorMessage = "Ошибка сервера";
            }
          });
      }
    },
  },
};
</script>
