import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import axios from "@/plugins/axios";
import store from "./store";
import vuetify from "./plugins/vuetify";
import ApiService from "@/api/api.service";

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

// router.beforeEach((to, from, next) =>
//     Promise.all([store.dispatch("checkAuth")]).then(next));

ApiService.init();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
