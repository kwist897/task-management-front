<template>
  <v-container
    fluid
    class="flex-column rounded-lg elevation-5 pa-8 ma-2 align-self-center justify-center"
  >
    <div class="d-flex flex-column text-center align-center py-16">
      <h1 class="text-h3 mb-8">Sign In</h1>
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

        <v-btn
          class="align-center my-8"
          @click="handleLogin(username, password)"
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
    };
  },
  methods: {
    handleLogin(username, password) {
      this.$store.dispatch("login", { username, password }).then(() => {
        this.$store.dispatch("getCurrentProfile").then(() => {
          this.$store
            .dispatch("getUserWorkspaces")
            .then(() => this.$router.push({ name: "/" }));
        });
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
