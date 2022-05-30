<template>
  <v-container
    fluid
    class="elevation-5 pa-8 ma-2 rounded-lg text-center align-content-center"
  >
    <v-row>
      <v-col cols="12">
        <div class="d-flex flex-row justify-space-between">
          <p class="text-h5 text-start">Projects:</p>
          <v-dialog v-model="addProjectDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-12"
                color="primary"
                size="80"
                v-on:="on"
                v-bind="attrs"
                @click="addProjectDialog = !addProjectDialog"
                >create</v-btn
              >
            </template>

            <v-overlay :value="addProjectDialog">
              <v-card light>
                <v-card-title>
                  <span class="text-h5">New project</span>
                </v-card-title>

                <v-card-text>
                  <v-text-field
                    class="pa-8"
                    v-model="project.title"
                    label="title"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    class="pa-8"
                    v-model="project.description"
                    label="description"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    class="pa-8"
                    v-model="project.version"
                    label="version"
                    type="text"
                  ></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addProjectDialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="createProject">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-overlay>
          </v-dialog>
        </div>
        <v-divider class="py-3"></v-divider>

        <div class="d-flex flex-row justify-space-around mb-12">
          <span class="col-4">id</span>
          <v-divider vertical></v-divider>
          <span class="col-4">title</span>
          <v-divider vertical></v-divider>
          <span class="col-4">version</span>
        </div>
        <v-list v-if="projects.length !== 0">
          <v-list-item-group>
            <v-list-item
              v-for="(project, index) in projects"
              :key="index"
              @click="openTasks(project.id)"
            >
              <v-list-item-content>
                <div class="d-flex flex-row justify-space-around">
                  <span v-text="project.id" class="col-4"></span>
                  <span v-text="project.title" class="col-4"></span>
                  <span v-text="project.version" class="col-4"></span>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div v-else>
          <span class="text-subtitle-1"
            >There are no projects, but you can create new one.</span
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex/dist/vuex.mjs";
import ApiService from "@/api/api.service";

export default {
  name: "Workspace",
  props: ["id"],
  data() {
    return {
      projects: [],
      project: {},
      addProjectDialog: false,
    };
  },
  computed: {
    ...mapGetters([
      "currentProfile",
      "currentGroups",
      "currentProjects",
      "workspaceNumber",
    ]),
  },
  methods: {
    openTasks(projectId) {
      this.$store.dispatch("setProjectId", projectId);
      this.$router.push(`/project/${projectId}/tasks`);
    },
    createProject() {
      const projectToSave = {
        title: this.project.title,
        description: this.project.description,
        version: this.project.version,
        workspaceId: this.workspaceNumber,
      };
      ApiService.post("/project/project", { ...projectToSave }).then((res) => {
        this.$store.dispatch("addProject", res.data);
        this.addProjectDialog = false;
      });
    },
  },
  beforeRouteUpdate() {
    this.$store
      .dispatch("getProjectsByWorkspace", this.workspaceNumber)
      .then((res) => {
        console.log(res);
        this.projects = res;
      });
  },
  mounted() {
    this.$store
      .dispatch("getProjectsByWorkspace", this.workspaceNumber)
      .then((res) => {
        console.log(res);
        this.projects = res;
      });
  },
};
</script>

<style scoped></style>
