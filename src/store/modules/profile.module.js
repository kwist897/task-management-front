import ApiService from "@/api/api.service";

const state = {
  errors: null,
  profile: {},
};

const getters = {
  currentProfile(state) {
    return state.profile;
  },
};

const actions = {
  createProfile(context, profile) {
    return new Promise((resolve) => {
      ApiService.post("/user/profile", { ...profile }).then(({ data }) => {
        if (data.data === "OK") {
          context.commit("setProfile", data.data);
        }
        resolve(data);
      });
    });
  },
  getCurrentProfile(context) {
    return new Promise((resolve) => {
      ApiService.setHeader();
      ApiService.query("/user/profile").then(({ data }) => {
        context.commit("setProfile", data.data);
        resolve(data);
      });
    });
  },
  updateCurrentProfile(context, profile) {
    return new Promise((resolve) => {
      ApiService.put(`/user/profile/${context.state.profile.id}`, {
        ...profile,
      })
        .then(({ data }) => {
          if (data.result === "OK") {
            context.commit("setProfile", data.data);
          }
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
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
