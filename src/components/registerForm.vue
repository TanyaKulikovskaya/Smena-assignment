<template>
  <v-card class="elevation-9" min-height="420px">
    <v-toolbar dark color="primary">
      <v-toolbar-title class="mx-auto text-uppercase">Регистрация</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="registerForm" v-model="valid" lazy-validation>
        <v-text-field
          v-model="registerUserName"
          label="Имя пользователя"
          type="text"
          :rules="registerUserNameRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="registerPassword"
          label="Пароль"
          type="password"
          :rules="registerPasswordRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="registerPasswordConfirmation"
          label="Подтверждение пароля"
          type="password"
          :rules="registerPasswordConfirmationRules"
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
    <v-card-text v-if="showRegisterError" class="error--text">
      {{ registerErrorMessage }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "register-form",
  data: () => ({
    valid: false,
    registerUserName: "",
    registerPassword: "",
    registerPasswordConfirmation: "",
    registerUserNameRules: [(v) => !!v || "Введите имя пользователя"],
    registerPasswordRules: [(v) => !!v || "Введите пароль"],
    registerPasswordConfirmationRules: [
      (v) => !!v || "Подтвердите введенный пароль",
    ],
    showRegisterError: false,
    registerErrorMessage: "",
  }),
  methods: {
    async register() {
      if (this.$refs.registerForm.validate()) {
        if (this.registerPassword !== this.registerPasswordConfirmation) {
          this.showRegisterError = true;
          this.registerErrorMessage = "Введенные пароли не совпадают";
          return;
        }
        let data = {
          username: this.registerUserName,
          password: this.registerPassword,
        };
        this.$store
          .dispatch("register", data)
          .then(() => this.$router.replace({ name: "user" }))
          .catch((error) => {
            localStorage.removeItem("token");
            this.showRegisterError = true;
            console.log(error.response.data)
            if (error.response && error.response.status === 400) {
              this.registerErrorMessage = error.response.data.error;
            } else {
              this.registerErrorMessage = "Ошибка сервера";
            }
          });
      }
    },
  },
};
</script>
