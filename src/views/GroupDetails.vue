<template>
  <v-container
    fluid
    grid-list-md
    class="text-center align-content-space-between pr-7"
  >
    <v-row class="d-flex flex-nowrap">
      <v-col cols="9" class="pl-7 elevation-5 rounded-lg text-start">
        <v-row>
          <v-col>
            <div class="d-flex flex-row">
              <span class="text-h6 pr-2" v-text="groupDetails.title"></span>
              <v-icon v-text="groupIcon()"></v-icon>
            </div>

            <div class="d-flex flex-column pr-5 py-2">
              <span
                v-text="groupDetails.description"
                class="text-subtitle-1"
              ></span>
              <span class="text-subtitle-2 pt-3"
                >created by:
                <span class="text-decoration-underline" v-text="name"></span
              ></span>
            </div>

            <div class="py-4">
              <div class="d-flex flex-row justify-space-between">
                <span class="text-h6">Workspaces</span>
                <v-dialog
                  v-model="addWorkspaceDialog"
                  persistent
                  max-width="50vw"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      class="mr-5"
                      v-on:="on"
                      v-bind="attrs"
                      @click="addWorkspaceDialog = !addWorkspaceDialog"
                      >add
                    </v-btn>
                  </template>

                  <v-overlay :value="addWorkspaceDialog">
                    <v-card light>
                      <v-card-title>
                        <span class="text-h5">New Workspace</span>
                      </v-card-title>

                      <v-card-text>
                        <v-text-field
                          class="pa-8"
                          v-model="newWorkspace.title"
                          label="title"
                          type="text"
                        ></v-text-field>
                        <v-text-field
                          class="pa-8"
                          v-model="newWorkspace.description"
                          label="description"
                          type="text"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="addWorkspaceDialog = false"
                        >
                          Close
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="createWorkspace"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-overlay>
                </v-dialog>
              </div>
              <v-divider class="my-5"></v-divider>
              <div
                class="d-flex flex-row py-2 justify-space-around text-center px-4"
              >
                <span class="col-4">id</span>
                <span class="col-4">title</span>
                <span class="col-4">created by</span>
              </div>
              <v-list>
                <v-list-item-group>
                  <v-list-item
                    v-for="workspace in workspaces"
                    :key="workspace.id"
                  >
                    <v-list-item-content>
                      <div
                        class="d-flex flex-row justify-space-around text-center"
                      >
                        <span v-text="workspace.id" class="col-4"></span>
                        <span v-text="workspace.title" class="col-4"></span>
                        <span class="col-4" v-text="name"></span>
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-spacer class="px-2"></v-spacer>

      <v-col cols="3" class="elevation-5 rounded-lg">
        <template>
          <div class="d-flex flex-row justify-space-between pr-5">
            <div class="text-start px-5 pb-5 d-flex flex-column">
              <span class="text-h6 text-start">Participants</span>
              <span>total: {{ totalParticipants }}</span>
            </div>
            <v-dialog
              v-model="addParticipantDialog"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  size="80"
                  fab
                  small
                  v-on:="on"
                  v-bind="attrs"
                  @click="addParticipantDialog = !addParticipantDialog"
                  ><v-icon>mdi-account-plus</v-icon>
                </v-btn>
              </template>

              <v-overlay :value="addParticipantDialog">
                <v-card light>
                  <v-card-title>
                    <span class="text-h5">User Profile</span>
                  </v-card-title>

                  <v-card-text>
                    <v-text-field
                      class="pa-8"
                      v-model="participantUsername"
                      label="username"
                      type="text"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="addParticipantDialog = false"
                    >
                      Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="addParticipant()">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-overlay>
            </v-dialog>
          </div>
          <v-divider class="my-4"></v-divider>
          <v-list class="overflow-y-auto" max-height="400">
            <v-list-item-group>
              <v-list-item
                dense
                ripple
                v-for="participant in participants"
                :key="participant.id"
                class="d-flex justify-space-around px-12"
              >
                <v-list-item-avatar class="ma-auto" size="42">
                  <v-avatar
                    v-text="getPictureText(participant)"
                    class="green text-subtitle-1 white--text"
                    size="36"
                  ></v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    class="align-self-start text-start pl-3 text-subtitle-1"
                    v-text="`${participant.firstName} ${participant.lastName}`"
                  ></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    icon
                    color="remove"
                    @click="removeParticipant(participant.id)"
                    ><v-icon size="30">mdi-account-minus</v-icon></v-btn
                  >
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex/dist/vuex.mjs";
import Vue from "vue";

export default {
  name: "GroupDetails",
  props: ["id"],
  data() {
    return {
      addWorkspaceDialog: false,
      addParticipantDialog: false,
      participants: [],
      groupDetails: {},
      workspaces: [],
      participantUsername: "",
      newWorkspace: {},
    };
  },
  computed: {
    ...mapGetters(["currentProfile", "currentGroups", "currentUser"]),
    totalParticipants() {
      return this.participants.length;
    },
    name() {
      if (
        this.workspace !== undefined &&
        Object.keys(this.workspace).length !== 0
      ) {
        return `${this.workspace.createdBy.firstName} ${this.workspace.createdBy.lastName}`;
      } else {
        return "";
      }
    },
  },
  methods: {
    getPictureText(participant) {
      if (Object.keys(participant).length !== 0) {
        return participant.firstName.charAt(0) + participant.lastName.charAt(0);
      } else {
        return "";
      }
    },

    groupIcon() {
      if (this.groupDetails.isPrivate === true) {
        return "mdi-lock";
      }
      return "mdi-earth";
    },

    addParticipant() {
      this.findProfileByUsername()
        .then(({ data }) => {
          console.log(data);
          const payload = {
            profileId: data.profile.id,
            groupId: this.id,
          };
          this.$store.dispatch("addParticipant", payload).then((res) => {
            this.participants = res.data.participants;
            this.addParticipantDialog = false;
          });
        })
        .catch((result) => console.log(result));
    },

    removeParticipant(profileId) {
      const payload = {
        profileId: profileId,
        groupId: this.id,
      };
      this.$store.dispatch("removeParticipant", payload).then((res) => {
        this.participants = res.data.participants;
      });
    },

    findProfileByUsername() {
      return Vue.axios.get("/auth/user", {
        params: {
          username: this.participantUsername,
        },
      });
    },

    createWorkspace() {
      const workspaceToSend = {
        title: this.newWorkspace.title,
        description: this.newWorkspace.description,
        groupId: this.id,
        workspaceType: "GROUP_WORKSPACE",
      };
      this.$store.dispatch("createWorkspace", workspaceToSend).then((res) => {
        console.log(res);
        this.addWorkspaceDialog = false;
      });
    },
  },
  mounted() {
    this.$store.dispatch("getGroups", this.currentProfile.id).then((res) => {
      if (res.result === "OK") {
        const groups = res.data;
        const group = groups.find((group) => group.id === Number(this.id));

        this.groupDetails = group;
        this.participants = group.participants;

        this.$store.dispatch("getGroupWorkspaces", this.id).then((res) => {
          this.workspaces = res.data;
        });
      }
    });
  },
};
</script>

<style scoped></style>
