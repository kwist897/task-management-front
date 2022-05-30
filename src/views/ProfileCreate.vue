<template>
  <v-container
    fluid
    class="flex-column elevation-5 pa-8 ma-2 align-self-center text-center justify-center"
  >
    <div
      class="d-flex text-center flex-column align-content-center align-center my-8"
    >
      <v-avatar size="128" color="blue">
        <v-icon size="64"> mdi-account-details </v-icon>
      </v-avatar>
      <p class="my-6">Creating profile</p>
      <v-text-field
        class="pa-4"
        v-model="firstName"
        label="first name"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        label="last name"
        type="text"
      ></v-text-field>
      <v-btn
        class="mt-8"
        color="primary"
        @click="createProfile(firstName, lastName)"
        >Send</v-btn
      >
    </div>
  </v-container>
</template>

<script>
export default {
  name: "ProfileCreate",
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    createProfile(firstName, lastName) {
      this.$store
        .dispatch("createProfile", {
          firstName,
          lastName,
        })
        .then(() => this.$router.push("/"));
    },
  },
};
</script>

<style scoped></style>
