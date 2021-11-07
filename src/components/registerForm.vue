<template>
  <v-card class="elevation-9" min-height="420px">
    <v-toolbar dark color="primary">
      <v-toolbar-title class="mx-auto text-uppercase">
        Регистрация
      </v-toolbar-title>
    </v-toolbar>
    <template v-if="!showSuccess">
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
          <v-text-field
            v-model="passwordConfirmation"
            label="Подтверждение пароля"
            type="password"
            :rules="passwordConfirmationRules"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn min-width="180" color="primary" @click="register">
          Регистрация
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn min-width="120" color="primary" outlined to="/login">Вход</v-btn>
      </v-card-actions>
      <v-card-text v-if="showError" class="error--text">
        {{ errorMessage }}
      </v-card-text>
    </template>
    <template v-else>
      <v-card-text class="text-center success--text text-h4 py-10">
        {{ successMessage }}
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn min-width="180" color="primary" to="/login">Вход</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "register-form",
  data: () => ({
    valid: false,
    username: "",
    password: "",
    passwordConfirmation: "",
    usernameRules: [(v) => !!v || "Введите имя пользователя"],
    passwordRules: [(v) => !!v || "Введите пароль"],
    passwordConfirmationRules: [(v) => !!v || "Подтвердите введенный пароль"],
    showError: false,
    errorMessage: "",
    showSuccess: false,
    successMessage: "",
  }),
  created() {
    this.logout();
  },
  methods: {
    ...mapActions(["logout"]),
    async register() {
      if (this.$refs.form.validate()) {
        if (this.password !== this.passwordConfirmation) {
          this.showError = true;
          this.errorMessage = "Введенные пароли не совпадают";
          return;
        }
        let data = {
          username: this.username,
          password: this.password,
        };
        this.$store
          .dispatch("register", data)
          .then((response) => {
            this.showSuccess = true;
            this.successMessage = response.data.message;
          })
          .catch((error) => {
            this.showError = true;
            if (error.response && error.response.status === 400) {
              this.errorMessage = error.response.data.error;
            } else {
              this.errorMessage = "Ошибка сервера";
            }
          });
      }
    },
  },
};
</script>
