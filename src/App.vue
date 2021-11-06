<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout flex align-center justify-center>
          <v-flex xs12 sm8 md6>
            <keep-alive>
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </keep-alive>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
.fade {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
}
</style>
