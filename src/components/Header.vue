<template>
  <v-navigation-drawer app light width="20em" floating class="elevation-5">
    <div class="d-flex flex-column align-content-center text-center">
      <h1 class="align-self-center hover text-h4 my-12" @click="toHome">
        Task Manager
      </h1>
      <div v-if="isAuthenticated">
        <v-list flat>
          <v-list-item>
            <v-list-item-avatar class="ma-auto text-center text-h5" size="42">
              <v-avatar
                v-text="getPictureText"
                class="primary"
                size="42"
              ></v-avatar>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content
              class="text-center d-flex align-content-center"
            >
              <v-list-item-title class="text-h6"
                >{{ currentProfile.firstName + " " + currentProfile.lastName }}
              </v-list-item-title>
              <v-list-item-subtitle
                >{{ currentUser.email }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav class="px-6">
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-group
              :value="workspaceSelected"
              prepend-icon="mdi-application-brackets"
            >
              <template v-slot:activator>
                <v-list-item-title class="text-start"
                  >Workspaces</v-list-item-title
                >
              </template>

              <v-list-group sub-group>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title class="black--text text-start"
                      >Personal</v-list-item-title
                    >
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="personalWorkspace in currentUserWorkspaces.personalWorkspaces"
                  :key="personalWorkspace.id"
                  @click="openWorkspace(personalWorkspace.id)"
                >
                  <v-spacer class="col-3"></v-spacer>
                  <v-list-item-title
                    class="text-start"
                    v-text="personalWorkspace.title"
                  ></v-list-item-title>
                </v-list-item>
              </v-list-group>

              <v-list-group sub-group>
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title class="black--text text-start"
                      >Group workspaces</v-list-item-title
                    >
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="groupWorkspace in currentUserWorkspaces.groupWorkspaces"
                  :key="groupWorkspace.id"
                  @click="openWorkspace(groupWorkspace.id)"
                >
                  <v-spacer class="col-3"></v-spacer>
                  <v-list-item-title
                    class="text-start"
                    v-text="groupWorkspace.title"
                  ></v-list-item-title>
                </v-list-item>
              </v-list-group>
            </v-list-group>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="$router.push(`${item.route}`)"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content class="d-flex text-start">
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-divider class="pa-4"></v-divider>
        <v-btn color="primary" @click="logout"
          ><v-icon left>mdi-logout</v-icon> Logout</v-btn
        >
      </div>
      <div class="d-flex flex-row justify-center ma-10" v-else>
        <v-btn
          text
          color="secondary"
          class="ma-auto"
          @click="$router.push('/login')"
          >Sign In
        </v-btn>
        <v-btn
          depressed
          color="primary"
          class="ma-auto"
          @click="$router.push('/registration')"
          >Sign Up
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  data: () => ({
    selected: {},
    selectedItem: [],
    items: [
      {
        icon: "mdi-account",
        text: "Profile",
        route: "/profile",
      },
      {
        icon: "mdi-account-group",
        text: "Groups",
        items: [
          {
            icon: "mdi-tag-multiple",
            text: "Workspace",
          },
        ],
        route: "/group",
      },
      {
        icon: "mdi-tag-multiple",
        text: "Tasks",
        route: "/task",
      },
    ],
    workspaceSelected: false,
    groups: [],
  }),
  computed: {
    ...mapGetters([
      "currentUser",
      "isAuthenticated",
      "currentProfile",
      "currentUserWorkspaces",
    ]),
    getPictureText() {
      if (
        this.isAuthenticated &&
        Object.keys(this.currentProfile).length !== 0
      ) {
        return (
          this.currentProfile.firstName.charAt(0) +
          this.currentProfile.lastName.charAt(0)
        );
      } else {
        return this.currentUser.username;
      }
    },
    username() {
      if (this.currentProfile) {
        return (
          this.currentProfile.firstName + " " + this.currentProfile.lastName
        );
      } else {
        return this.currentUser.username;
      }
    },
  },
  methods: {
    toHome() {
      this.$router.push("/profile");
    },
    logout() {
      this.$store.dispatch("logout").then(() => this.toHome());
    },
    openWorkspace(workspaceId) {
      console.log(workspaceId);
      this.$store.dispatch("setWorkspaceId", workspaceId);
      this.$router.replace({ name: "Workspace", params: { id: workspaceId } });
    },
  },
};
</script>

<style scoped>
.hover:hover {
  cursor: pointer;
}
</style>
