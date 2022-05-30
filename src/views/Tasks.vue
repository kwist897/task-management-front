<template>
  <v-container
    fluid
    class="elevation-5 pa-8 ma-2 rounded-lg text-center align-content-center"
  >
    <v-row>
      <v-col cols="12">
        <div class="d-flex flex-row justify-space-between">
          <span class="text-h5">Tasks</span>
          <v-dialog v-model="taskDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-12"
                color="primary"
                size="80"
                v-on:="on"
                v-bind="attrs"
                @click="taskDialog = !taskDialog"
                >add task</v-btn
              >
            </template>

            <v-overlay :value="taskDialog">
              <v-card light>
                <v-card-title>
                  <span class="text-h5">New task</span>
                </v-card-title>

                <v-card-text>
                  <v-text-field
                    class="pa-8"
                    v-model="newTask.subject"
                    label="subject"
                    type="text"
                  ></v-text-field>
                  <v-select
                    :items="statuses"
                    label="status"
                    solo
                    v-model="newTask.status"
                  ></v-select>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="taskDialog = false">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="createTask">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-overlay>
          </v-dialog>
        </div>
        <v-divider class="my-5"></v-divider>
        <div class="d-flex flex-row justify-space-around">
          <span class="col-3">id</span>
          <span class="col-3">subject</span>
          <span class="col-3">status</span>
          <span class="col-3">Action</span>
        </div>
        <v-list>
          <v-list-item-group class="d-flex flex-row justify-space-around">
            <v-list-item v-for="(task, index) in tasks" :key="index">
              <v-list-item-content>
                <span v-text="task.id" class="col-3"></span>
                <span v-text="task.subject" class="col-3"></span>
                <span v-text="task.status" class="col-3"></span>
              </v-list-item-content>
              <v-dialog v-model="taskDialogUpdate" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-12"
                    color="primary"
                    size="80"
                    v-on:="on"
                    v-bind="attrs"
                    @click="prepareUpdate(task)"
                    >update</v-btn
                  >
                </template>

                <v-overlay :value="taskDialogUpdate">
                  <v-card light>
                    <v-card-title>
                      <span class="text-h5">New task</span>
                    </v-card-title>

                    <v-card-text>
                      <v-text-field
                        class="pa-8"
                        v-model="updateTask.subject"
                        label="subject"
                        type="text"
                      ></v-text-field>
                      <v-select
                        :items="statuses"
                        label="status"
                        solo
                        v-model="updateTask.status"
                      ></v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="taskDialogUpdate = false"
                      >
                        Close
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="updatingTask">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-overlay>
              </v-dialog>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex/dist/vuex.mjs";

export default {
  name: "Tasks",
  props: ["id"],
  data() {
    return {
      taskDialog: false,
      statuses: [
        "OPENED",
        "CREATED",
        "IN_WORK",
        "REVIEW",
        "DONE",
        "CLOSED",
        "EXPIRED",
      ],
      taskDialogUpdate: false,
      tasks: [],
      newTask: {},
      updateTask: {},
    };
  },
  computed: {
    ...mapGetters(["currentProjects", "currentTasks", "currentProjectId"]),
  },
  methods: {
    createTask() {
      const task = {
        subject: this.newTask.subject,
        status: this.newTask.status,
        projectId: this.currentProjectId,
      };
      this.$store.dispatch("createTask", task).then((res) => {
        console.log(res);
        this.tasks.push(res.data);
      });
    },
    prepareUpdate(task) {
      this.updateTask.subject = task.subject;
      this.updateTask.id = task.id;
      this.updateTask.status = task.status;
      this.updateTask.ownerId = task.ownerId;
      this.updateTask.proejctId = task.projectId;
      this.taskDialogUpdate = true;
    },
    updatingTask() {
      this.$store.dispatch("updateTask", this.updateTask).then((res) => {
        console.log(res);
        this.tasks.push(res.data);
      });
    },
  },
  beforeRouteUpdate() {
    this.$store
      .dispatch("getTasksByProject", this.currentProjectId)
      .then((res) => {
        this.tasks = res;
      });
  },
  mounted() {
    this.$store
      .dispatch("getTasksByProject", this.currentProjectId)
      .then((res) => {
        this.tasks = res;
      });
  },
};
</script>

<style scoped></style>
