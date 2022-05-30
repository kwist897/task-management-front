import ApiService from "@/api/api.service";

const state = {
  errors: null,
  userWorkspaces: {},
  groupWorkspaces: [],
};

const getters = {
  currentUserWorkspaces(state) {
    return state.userWorkspaces;
  },
  currentGroupWorkspaces(state) {
    return state.groupWorkspaces;
  },
};

const actions = {
  getUserWorkspaces(context) {
    return new Promise((resolve, reject) => {
      ApiService.query(`/user/workspace`)
        .then(({ data }) => {
          context.commit("setUserWorkspaces", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
          reject(response);
        });
    });
  },

  getGroupWorkspaces(context, groupId) {
    return new Promise((resolve, reject) => {
      ApiService.query(`/user/group/${groupId}/workspace`)
        .then(({ data }) => {
          context.commit("setGroupWorkspaces", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
          reject(response);
        });
    });
  },
  createWorkspace(context, workspace) {
    return new Promise((resolve) => {
      ApiService.post("/user/workspace", { ...workspace })
        .then(({ data }) => {
          context.commit("addGroupWorkspace", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
        });
    });
  },
};

const mutations = {
  setError(state, error) {
    state.errors = error;
  },
  setUserWorkspaces(state, workspaces) {
    state.userWorkspaces = workspaces;
    state.errors = {};
  },
  addGroupWorkspace(state, workspace) {
    state.groupWorkspaces.push(workspace);
  },
  setGroupWorkspaces(state, workspaces) {
    state.groupWorkspaces = workspaces;
    state.errors = {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
