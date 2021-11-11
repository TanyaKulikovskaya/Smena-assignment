<template>
  <div>
    <template v-if="user && !showError">
      <v-card class="elevation-9 py-6 px-4" min-height="540px">
        <v-img
          :src="user.avatar"
          class="white--text align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="460px"
        >
          <v-card-title class="text-uppercase">
            {{ user.username }}
          </v-card-title>
        </v-img>
        <v-card-text class="text-subtitle-1">
          {{ user.about }}
        </v-card-text>
      </v-card>
    </template>
    <template v-else-if="showError">
      <v-card class="elevation-9 py-6 px-4" min-height="540px">
        <v-card-text class="text-center error--text text-h6 py-10">
          {{ errorMessage }}
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn min-width="180" color="primary" to="/login">Вход</v-btn>
          <v-spacer></v-spacer>
          <v-btn min-width="180" color="primary" outlined to="/register">
            Регистрация
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </div>
</template>
<script>
export default {
  name: "user",
  data: () => ({
    user: null,
    showError: false,
    errorMessage: "",
  }),
  created() {
    this.$store.dispatch("getUser").then(
      (response) => {
        this.user = response;
      },
      (error) => {
        this.showError = true;
        if (error.response && error.response.status < 500) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "Ошибка сервера";
        }
      }
    );
  },
};
</script>
