<template>
  <v-app>
    <Header />
    <v-main>
      <v-container fluid class="fill-height">
        <router-view :key="$route.id"></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
