<template>
  <v-container
    fluid
    class="flex-column rounded-lg elevation-5 pa-8 ma-2 align-self-center justify-center"
  >
    <div class="d-flex flex-column text-center align-center py-16">
      <h1 class="text-h3 mb-8">Sign Up</h1>
      <form class="col-5 text-body-1 mt-8">
        <v-text-field
          v-model="username"
          label="username"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="password"
          type="password"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          type="email"
        ></v-text-field>

        <v-btn
          class="align-center my-8"
          @click="handleRegistration(username, password, email, accountType)"
          color="primary"
          >Send
        </v-btn>
      </form>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      email: "",
      accountType: "PERSONAL",
    };
  },
  methods: {
    handleRegistration(username, password, email, accountType) {
      this.$store
        .dispatch("register", {
          username,
          password,
          email,
          accountType,
        })
        .then(() => this.$router.push("/profile/create"));
    },
  },
};
</script>

<style scoped></style>
