<template>
  <v-app>
    <!-- <v-main> -->
      <v-layout>
      <v-navigation-drawer
        permanent
        location="left"
      >
        <template v-slot:prepend>
          <v-list-item
            lines="two"
            :prepend-avatar="profileImage"
            title="Parth Jasani"
            subtitle="Logged in"
          ></v-list-item>
        </template>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main><dishes></dishes></v-main>
    </v-layout>
    <!-- </v-main> -->
  </v-app>
</template>

<script>
import { defineComponent } from "vue";
import dishes from './components/dishes.vue'
import profileImage from '@/assets/profile.png'
export default defineComponent({
  name: 'App',

  components: {
    dishes,
  },

  data: () => ({
    profileImage
  }),
})
</script>
<style>
  @import "https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css";
</style>