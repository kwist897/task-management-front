import ApiService from "@/api/api.service";
import JwtService from "@/api/jwt.service";

const state = {
  errors: null,
  groups: [],
};

const getters = {
  userGroups(state) {
    return state.user;
  },
};

const actions = {
  getGroups(context, profileId) {
    return new Promise((resolve) => {
      ApiService.get(`/profile/${profileId}/group`)
        .then(({ response }) => {
          context.commit("setAuth", response.data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit("setError", response.data.error.text);
        });
    });
  },
  createGroup(context, group) {
    return new Promise((resolve) => {
      ApiService.post("/user/group", { group })
        .then(({ response }) => {
          context.commit("setGroups", response.data.data);
          resolve(response);
        })
        .catch(({ response }) => {
          context.commit("setError", response.data.error.text);
        });
    });
  },
};

const mutations = {
  setError(state, error) {
    state.errors = error;
  },
  setGroups(state, group) {
    state.groups = group;
    state.errors = {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
