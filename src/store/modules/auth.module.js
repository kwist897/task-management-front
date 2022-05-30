import ApiService from "@/api/api.service";
import JwtService from "@/api/jwt.service";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
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
  login(context, credentials) {
    return new Promise((resolve) => {
      ApiService.post("/auth/user/authenticate", { ...credentials })
        .then(({ data }) => {
          context.commit("setAuth", data.data);
          context.commit("updateToken", data.data.tokens);
          resolve(data);
        })
        .catch((response) => {
          context.commit("setError", response.error);
        });
    });
  },
  logout(context) {
    context.commit("logOut");
  },
  register(context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("/auth/user/registration", { ...credentials })
        .then(({ data }) => {
          if (data.result === "OK") {
            context.commit("setAuth", data.data);
            context.commit("updateToken", data.data.tokens);
          }
          resolve(data.data);
        })
        .catch(({ response }) => {
          context.commit("setError", response.error);
          reject(response.error);
        });
    });
  },
  updateUser(context, user) {
    context.commit("setUser", user);
  },
  checkAuth(context) {
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        if (Object.keys(context.rootState.profile.profile).length === 0) {
          ApiService.setHeader();

          ApiService.query("/auth/user/current")
            .then(({ data }) => {
              context.commit("setAuth", data.data);
              return resolve(true);
            })
            .catch((response) => {
              context.commit("setError", response.error);
              return reject(response.error);
            });
        } else {
          return resolve(false);
        }
      } else {
        context.commit("logOut");
        return reject(false);
      }
    });
  },
  exchangeTokens(context) {
    return new Promise((resolve, reject) => {
      if (JwtService.getRefreshToken()) {
        ApiService.setRefreshHeader();
        ApiService.query("/auth/token/refresh")
          .then(({ data }) => {
            context.commit("updateToken", data);
            resolve(data);
          })
          .catch((response) => {
            context.commit("setError", response);
            reject(response);
          });
      }
    });
  },
};

const mutations = {
  setError(state, error) {
    state.errors = error;
  },
  setAuth(state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
  },
  setUser(state, user) {
    state.user = user;
  },
  updateToken(state, response) {
    JwtService.saveTokens(
      response.accessToken.accessToken,
      response.refreshToken.refreshToken
    );
    ApiService.setHeader();
  },
  logOut(state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyTokens();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
