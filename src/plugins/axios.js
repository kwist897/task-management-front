"use strict";

import Vue from "vue";
import axios from "axios";
import store from "../store";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL:
    process.env.NODE_ENV === "docker"
      ? "http://gateway:8092"
      : "http://localhost:8092",
  timeout: 1000,
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(error.response.status === 401);
    if (error.response.status === 401) {
      store.dispatch("exchangeTokens").then((res) => {
        console.log(res);
        this.$forceUpdate();
      });
    }
    return Promise.resolve(error);
  }
);

// eslint-disable-next-line no-unused-vars
Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
