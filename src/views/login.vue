<template>
  <v-card class="elevation-9" min-height="380px">
    <v-toolbar dark color="primary">
      <v-toolbar-title class="mx-auto text-uppercase">Вход</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="username"
          label="Имя пользователя"
          type="text"
          :rules="usernameRules"
          autofocus
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Пароль"
          type="password"
          :rules="passwordRules"
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
    <v-card-text v-if="showError" class="error--text">
      {{ errorMessage }}
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "login",
  data: () => ({
    valid: false,
    username: "",
    password: "",
    usernameRules: [(v) => !!v || "Введите имя пользователя"],
    passwordRules: [(v) => !!v || "Введите пароль"],
    showError: false,
    errorMessage: "",
  }),
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        let data = {
          username: this.username,
          password: this.password,
        };
        this.$store.dispatch("login", data).then(
          () => {
            this.$router.replace({ name: "user" });
          },
          (error) => {
            this.showError = true;
            if (error.response && error.response.status === 401) {
              this.errorMessage = error.response.data.error;
            } else {
              this.errorMessage = "Ошибка сервера";
            }
          }
        );
      }
    },
  },
};
</script>
