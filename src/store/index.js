import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth.module";
import group from "./modules/group.module";
import profile from "./modules/profile.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    group,
  },
});
