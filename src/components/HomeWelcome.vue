<template>
  <v-container fluid class="fill-height text-center justify-center flex-column">
    <h3 class="text-h4">New here? You should register to start</h3>
    <router-link to="/registration" class="text-h5 pa-12 text-decoration-none"
      >Click here to create new account</router-link
    >
  </v-container>
</template>

<script>
export default {
  name: "HomeWelcome",
};
</script>

<style scoped></style>
