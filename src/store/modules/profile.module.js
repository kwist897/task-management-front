import ApiService from "@/api/api.service";

const state = {
  errors: null,
  profile: {},
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  createProfile(context, profile) {
    return new Promise((resolve) => {
      ApiService.post("/user/profile", { profile })
        .then(({ response }) => {
          context.commit("setProfile", response.data.data);
          resolve(response);
        })
        .catch(({ response }) => {
          context.commit("setError", response.data.error.text);
        });
    });
  },
  getCurrent(context) {
    return new Promise((resolve) => {
      ApiService.get("/user/profile")
        .then(({ response }) => {
          console.log(response.data.data);
          context.commit("setProfile", response.data.data);
          resolve(response);
        })
        .catch(({ response }) => {
          context.commit("setError", response.data.error.text);
        });
    });
  },
};

const mutations = {
  setError(state, errors) {
    state.errors = errors;
  },
  setProfile(state, profile) {
    state.profile = profile;
    state.errors = {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
