import ApiService from "@/api/api.service";

const state = {
  errors: null,
  projects: [],
  id: 0,
};

const getters = {
  currentProjects(state) {
    return state.projects;
  },
  workspaceNumber(state) {
    return state.id;
  },
};

const actions = {
  setWorkspaceId(context, workspaceId) {
    context.commit("setId", workspaceId);
  },
  createProject(context, project) {
    return new Promise((resolve, reject) => {
      ApiService.post("/project/project", { ...project })
        .then(({ data }) => {
          context.commit("setProject", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
          reject(response);
        });
    });
  },
  getProjectsByWorkspace(context, workspaceId) {
    return new Promise((resolve, reject) => {
      ApiService.query(`/project/workspace/${workspaceId}/projects`)
        .then(({ data }) => {
          context.commit("setProjects", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
          reject(response);
        });
    });
  },
  addProject(context, project) {
    context.commit("addProject", project);
  },
};

const mutations = {
  setError(state, error) {
    state.errors = error;
  },
  setProjects(state, projects) {
    state.projects = projects;
    state.errors = {};
  },
  addProject(state, project) {
    state.projects.push(project);
    state.errors = {};
  },
  setId(state, id) {
    state.id = id;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
