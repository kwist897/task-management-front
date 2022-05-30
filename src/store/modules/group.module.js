import ApiService from "@/api/api.service";
import Vue from "vue";

const state = {
  errors: null,
  groups: [],
};

const getters = {
  currentGroups(state) {
    return state.groups;
  },
};

const actions = {
  getGroups(context, profileId) {
    return new Promise((resolve, reject) => {
      ApiService.query(`/user/profile/${profileId}/group`)
        .then(({ data }) => {
          context.commit("setGroups", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
          reject(response);
        });
    });
  },
  createGroup(context, group) {
    return new Promise((resolve, reject) => {
      ApiService.post("/user/group", { ...group })
        .then(({ data }) => {
          context.commit("setGroups", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
          reject(response);
        });
    });
  },
  addParticipant(context, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post(`/user/group/${payload.groupId}/profile/${payload.profileId}`)
        .then(({ data }) => {
          context.commit("setGroups", data.data);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
          reject(response);
        });
    });
  },
  removeParticipant(context, payload) {
    return new Promise((resolve, reject) => {
      Vue.axios
        .delete(`/user/group/${payload.groupId}/profile/${payload.profileId}`)
        .then(({ data }) => {
          context.commit("setGroups", data.data);
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
  setGroups(state, groups) {
    state.groups = groups;
    state.errors = {};
  },
  addGroups(state, group) {
    state.groups.push(group);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
