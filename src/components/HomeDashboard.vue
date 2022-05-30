<template>
  <v-container fluid class="rounded-lg elevation-5 pa-8 ma-2 align-self-center justify-center">
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomeDashboard",
  data() {
    return {
      items: [],
    };
  },
  computed:{
    ...mapGetters(["currentUser", "currentProfile", "isAuthenticated"]),

  }
};
</script>

<style scoped></style>
