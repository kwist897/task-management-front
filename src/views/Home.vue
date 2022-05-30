<template>
  <HomeDashboard v-if="this.isAuthenticated"></HomeDashboard>
  <HomeWelcome v-else></HomeWelcome>
</template>

<script>
import HomeDashboard from "@/components/HomeDashboard";
import HomeWelcome from "@/components/HomeWelcome";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    HomeDashboard,
    HomeWelcome,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
};
</script>

<style scoped></style>
