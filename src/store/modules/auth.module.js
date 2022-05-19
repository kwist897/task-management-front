import ApiService from "@/api/api.service";
import JwtService from "@/api/jwt.service";

const state = {
  errors: null,
  user: {
    id: Number,
    username: String,
    email: String,
    accountType: String,
    tokens: {
      accessToken: {
        accessToken: String,
        expirationDate: String,
      },
      refreshToken: {
        refreshToken: String,
        expirationDate: String,
      },
    },
    profile: {
      id: Number,
      firstName: String,
      lastName: String,
    },
  },
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
      ApiService.post("/auth/user/authenticate", { credentials })
        .then(({ response }) => {
          context.commit("setAuth", response.data.data);
          resolve(response);
        })
        .catch(({ response }) => {
          context.commit("setError", response.data.error.text);
        });
    });
  },
  logout(context) {
    context.commit("logOut");
  },
  register(context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("/auth/user/registration", { ...credentials })
        .then(({ response }) => {
          context.commit("setAuth", response.data.data);
          resolve(response);
        })
        .catch(({ response }) => {
          context.commit("setError", response.data.errors);
          reject(response);
        });
    });
  },
  checkAuth(context) {
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("/auth/user/current")
          .then(({ response }) => {
            context.commit("setAuth", response.data.data);
            resolve(response);
          })
          .catch(({ response }) => {
            context.commit("setError", response.data.errors);
            reject(response);
          });
      } else {
        context.commit("logOut");
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

    JwtService.saveToken(state.user.tokens.accessToken.accessToken);
  },
  logOut(state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
