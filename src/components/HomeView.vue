<template>
  <v-row class="ma-auto pt-12">
    <v-col cols="12">
      <v-row
        class="background d-flex flex-fill align-content-space-between"
        dense
      >
        <v-col cols="4">
          <v-text-field
            dense
            v-model="searchText"
            prepend-icon="mdi-magnify"
            placeholder="search"
          ></v-text-field>
        </v-col>
        <v-col class="text-end ma-auto">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="secondary" dark v-bind="attrs" v-on="on">
                <v-text-field append-icon="mdi-filter">filter</v-text-field>
              </v-btn>
            </template>
            <v-list>
<!--              <v-list-item v-for="(item, index) in items" :key="index">-->
<!--                <v-list-item-title>{{ item.title }}</v-list-item-title>-->
<!--              </v-list-item>-->
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HelloWorld",
  // props:{
  //   projectId: Number
  // },
  data: () => ({
    searchText: "",
    tasks: [],
  }),
  computed: {
    isAuthenticated() {
      return this.$store.state.authenticated;
    },
  },
  created() {
      // this.props.projectId()
  },
};
</script>
<style>
.background {
  background-color: #f3f3f3;
}
</style>
