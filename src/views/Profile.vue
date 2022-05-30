<template>
  <v-container
    fluid
    class="flex-column elevation-5 pa-8 ma-2 rounded-lg align-self-center text-center justify-center"
  >
    <v-row>
      <v-col cols="3" class="d-flex flex-row justify-start">
        <span class="text-h6">Personal information</span>
      </v-col>
      <v-col class="d-flex flex-row justify-end">
        <v-btn color="primary" v-if="isEdit" @click="cancelEditing"
          ><v-icon left>mdi-close</v-icon> cancel
        </v-btn>
        <v-btn color="primary" v-else @click="isEdit = true"
          ><v-icon left>mdi-account-edit</v-icon> edit
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3" justify="center">
        <v-text-field
          v-text="'First Name'"
          readonly
          class="justify-center"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          class="justify-center"
          :readonly="!isEdit"
          v-model="firstName"
          flat
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3" justify="center">
        <v-text-field
          v-text="'Last Name'"
          readonly
          class="justify-center"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          class="justify-center"
          :readonly="!isEdit"
          v-model="lastName"
          flat
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3" justify="center">
        <v-text-field
          v-text="'Username'"
          readonly
          class="justify-center"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          class="justify-center"
          readonly
          v-model="username"
          flat
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3" justify="center">
        <v-text-field
          v-text="'Email'"
          readonly
          class="justify-center"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          class="justify-center"
          readonly
          v-model="email"
          flat
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" v-if="isEdit" @click="saveProfile">
          <v-icon left>mdi-check</v-icon>
          Save</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      isEdit: false,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
    };
  },

  computed: {
    ...mapGetters(["isAuthenticated", "currentProfile", "currentUser"]),
  },

  methods: {
    setPropertiesFromStore() {
      this.firstName = this.currentProfile.firstName;
      this.lastName = this.currentProfile.lastName;
      this.username = this.currentUser.username;
      this.email = this.currentUser.email;
    },
    cancelEditing() {
      this.setPropertiesFromStore();
      this.isEdit = false;
    },

    saveProfile() {
      if (this.isEdit) {
        this.$store
          .dispatch("updateCurrentProfile", {
            firstName: this.firstName,
            lastName: this.lastName,
          })
          .then(() => this.setPropertiesFromStore());

        this.isEdit = false;
      }
    },
  },
  mounted() {
    this.setPropertiesFromStore();
  },
};
</script>

<style scoped></style>
