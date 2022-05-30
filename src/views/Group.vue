<template>
  <v-container
    v-if="isLoading"
    fluid
    class="pa-8 ma-2 rounded-lg text-center align-content-space-between"
    ><v-progress-circular indeterminate color="primary" size="50"
  /></v-container>
  <v-container
    v-else
    fluid
    class="elevation-5 pa-8 ma-2 rounded-lg text-center align-content-center"
  >
    <v-row>
      <v-col class="d-flex flex-row justify-start">
        <span class="text-h6">Groups</span>
      </v-col>
      <v-col class="d-flex flex-row justify-end">
        <v-btn color="primary" @click="$router.push('/group/create')">
          Create group
        </v-btn>
      </v-col>
    </v-row>
    <v-divider class="my-5"></v-divider>
    <v-row class="mb-5 mt-1">
      <v-col cols="2">
        <span class="font-weight-bold">Access</span>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <span class="font-weight-bold">Title</span>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <span class="font-weight-bold">Created by</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item-group v-model="selectedGroup" color="primary">
            <v-list-item
              v-for="group in groups"
              :key="group.id"
              @click="openGroupDetails(group.id)"
            >
              <template>
                <v-row>
                  <v-col cols="2"
                    ><v-list-item-icon>
                      <v-icon v-text="groupIcon(group)"></v-icon>
                    </v-list-item-icon>
                  </v-col>
                  <v-col class="align-self-center">
                    <span v-text="group.title"></span>
                  </v-col>
                  <v-col class="align-self-center">
                    <span
                      v-text="
                        `${group.createdBy.firstName}  ${group.createdBy.lastName}`
                      "
                    ></span>
                  </v-col>
                </v-row>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>

    <!--    <v-row>-->
    <!--      <template v-for="group in groups">-->
    <!--        <v-col :key="group.id" cols="12">-->
    <!--          <v-hover v-slot="{ hover }">-->
    <!--            <transition name="fade">-->
    <!--              <v-card elevation="0">-->
    <!--                <v-row :class="{ selectedList: hover }">-->
    <!--                  <v-col cols="2"-->
    <!--                    ><v-icon v-text="groupIcon(group)"></v-icon>-->
    <!--                  </v-col>-->
    <!--                  <v-col><p v-text="group.title"></p> </v-col>-->
    <!--                  <v-col-->
    <!--                    ><p-->
    <!--                      v-text="-->
    <!--                        `${group.createdBy.firstName}  ${group.createdBy.lastName}`-->
    <!--                      "-->
    <!--                    ></p-->
    <!--                  ></v-col>-->
    <!--                </v-row>-->
    <!--              </v-card>-->
    <!--            </transition>-->
    <!--          </v-hover>-->
    <!--        </v-col>-->
    <!--      </template>-->
    <!--    </v-row>-->
    <!--    <v-row-->
    <!--      class="d-flex flex-row justify-space-between"-->
    <!--      v-for="group in groups"-->
    <!--      :key="group.id"-->
    <!--    >-->
    <!--        <v-col cols="2">-->
    <!--          <v-icon v-text="groupIcon(group)" />-->
    <!--        </v-col>-->
    <!--        <v-col>-->
    <!--          <span v-text="group.title"></span>-->
    <!--        </v-col>-->
    <!--        <v-col>-->
    <!--          <span-->
    <!--            v-text="`${group.createdBy.firstName} ${group.createdBy.lastName}`"-->
    <!--          ></span>-->
    <!--        </v-col>-->
    <!--    </v-row>-->
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Group",
  data() {
    return {
      selectedGroup: [],
      groups: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["currentProfile", "currentUser", "currentGroups"]),
    mapState,
  },
  methods: {
    groupIcon(group) {
      if (group.isPrivate === true) {
        return "mdi-lock";
      }
      return "mdi-earth";
    },
    fetchGroups() {
      this.$store.dispatch("getGroups", this.currentProfile.id).then((res) => {
        this.groups = res.data;
        this.isLoading = false;
      });
    },
    openGroupDetails(index) {
      this.$router.push(`/group/${index}/details`);
    },
  },
  mounted() {
    this.isLoading = true;
    if (this.currentProfile.id === undefined) {
      this.unwatch = this.$store.watch(
        (state, getters) => getters.currentProfile,
        (newValue, oldValue) => {
          console.log(`Updating from ${oldValue} to ${newValue}`);
          if (newValue !== undefined) {
            this.fetchGroups();
          }
        }
      );
    } else {
      this.fetchGroups();
    }
  },
};
</script>

<style scoped>
.selectedList {
  cursor: pointer;
  background-color: rgba(224, 224, 224, 0.31);
}
</style>
