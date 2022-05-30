<template>
  <v-container
    fluid
    class="flex-column elevation-5 pa-8 ma-2 align-self-center text-center justify-center"
  >
    <div
      class="d-flex text-center flex-column align-content-center align-center my-8"
    >
      <v-avatar size="128" color="blue">
        <v-icon size="64">mdi-account-group</v-icon>
      </v-avatar>
      <p class="my-6">Creating group</p>
      <v-text-field
        class="pa-4"
        v-model="group.title"
        label="title"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="group.description"
        label="description"
        type="text"
      ></v-text-field>
      <v-checkbox v-model="group.isPrivate" :label="'Private group'" />
      <v-btn class="mt-8" color="primary" @click="createGroup">Send</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "GroupCreate",
  data() {
    return {
      group: {
        isPrivate: false,
      },
    };
  },
  methods: {
    createGroup() {
      console.log(this.group);
      this.$store
        .dispatch("createGroup", this.group)
        .then(() => this.$router.push("/group"));
    },
  },
};
</script>

<style scoped></style>
