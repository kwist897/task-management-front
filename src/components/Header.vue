<template>
  <v-navigation-drawer app light width="20em">
    <div class="d-flex flex-column align-content-center">
      <h1 class="align-self-center display-1 font-weight-bold ma-12">
        Task Manager
      </h1>
      <div v-if="isAuthenticated">
        <v-list>
          <v-list-item>
            <v-list-item-avatar class="ma-auto text-center">
              <v-avatar v-text="getPictureText" class="primary"></v-avatar>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content class="text-center">
              <v-list-item-title class="text-h6" v-text="username()">
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item" @click="$router.push(`${item.route}`)"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
      <div class="d-flex flex-row justify-center ma-10" v-else>
        <v-btn
            text
            color="secondary"
            class="ma-auto"
            @click="$router.push('/login')"
        >Sign In
        </v-btn
        >
        <v-btn
            depressed
            color="primary"
            class="ma-auto"
            @click="$router.push('/registration')"
        >Sign Up
        </v-btn
        >
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Header",
  data: () => ({
    selected: {},
    selectedItem: [],
    items: [
      {
        text: "Profile",
        route: "/profile"
      },
      {
        text: "Group",
        route: "/group"
      },
      {
        text: "Tasks",
        route: "/task"
      },
    ],
  }),
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"]),
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
    getPictureText() {
      return (
          this.currentUser.profile.firstName.charAt(0) +
          this.currentUser.profile.lastName.charAt(0)
      );
    },
    username() {
      if (this.currentUser.profile) {
        return this.currentUser.profile.firstName + " " + this.currentUser.profile.lastName;
      } else {
        return "HEy";
      }
    }
  },
};
</script>

<style scoped>
.hover:hover {
  cursor: pointer;
}
</style>
