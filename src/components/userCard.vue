<template>
  <div>
    <template v-if="!is_error_getting_user">
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
    <template v-else>
      <v-card class="elevation-9 py-6 px-4" min-height="540px">
        <v-card-text class="error--text">
          {{ error_getting_user_message }}
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "user-card",
  computed: {
    ...mapGetters([
      "user",
      "is_error_getting_user",
      "error_getting_user_message",
    ]),
  },
  methods: {
    ...mapActions(["getUser"]),
  },
  created() {
    this.getUser();
  },
};
</script>
