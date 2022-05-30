import ApiService from "@/api/api.service";

const state = {
  errors: null,
  tasks: [],
  projectId: 0,
};

const getters = {
  currentTasks(state) {
    return state.tasks;
  },
  currentProjectId(state) {
    return state.projectId;
  },
};

const actions = {
  setProjectId(context, projectId) {
    context.commit("setId", projectId);
  },
  createTask(context, task) {
    return new Promise((resolve, reject) => {
      ApiService.post("/project/task", { ...task })
        .then(({ data }) => {
          context.commit("addTask", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
          reject(response);
        });
    });
  },
  updateTask(context, task) {
    return new Promise((resolve, reject) => {
      ApiService.put("/project/task", { ...task })
        .then(({ data }) => {
          context.commit("updTask", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
          reject(response);
        });
    });
  },
  getTasksByProject(context, projectId) {
    return new Promise((resolve, reject) => {
      ApiService.query(`/project/task/all/${projectId}`)
        .then(({ data }) => {
          context.commit("setTasks", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
          reject(response);
        });
    });
  },
};

const mutations = {
  setError(state, error) {
    state.errors = error;
  },
  setTasks(state, tasks) {
    state.tasks = tasks;
    state.errors = {};
  },
  addTask(state, task) {
    state.tasks.push(task);
    state.errors = {};
  },
  updTask(state, task) {
    const index = state.tasks.findIndex((val) => val.id === task.id);
    state.tasks[index] = task;
  },
  setId(state, id) {
    state.projectId = id;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
