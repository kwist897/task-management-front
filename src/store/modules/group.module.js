import ApiService from "@/api/api.service";
import JwtService from "@/api/jwt.service";

const state = {
  errors: null,
  user: {
    id: "",
    username: "",
    email: "",
    accountType: "",
    tokens: {
      accessToken: {
        accessToken: "",
        expirationDate: "",
      },
      refreshToken: {
        refreshToken: "",
        expirationDate: "",
      },
    },
    profile: {
      id: "",
      firstName: "",
      lastName: "",
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
      ApiService.post("/user/authenticate", { ...credentials })
        .then(({ data }) => {
          console.log(data.data);
          context.commit("setAuth", data.data);
          resolve(data);
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
      ApiService.post("users", { ...credentials })
        .then(({ data }) => {
          context.commit("setAuth", data.data);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit("setError", response.data.errors);
          reject(response);
        });
    });
  },
  checkAuth(context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("user")
        .then(({ data }) => {
          context.commit("setAuth", data.user);
        })
        .catch(({ response }) => {
          context.commit("setError", response.data.errors);
        });
    } else {
      context.commit("logOut");
    }
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
