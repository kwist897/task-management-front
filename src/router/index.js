import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Registration from "@/views/Registration";
import Home from "@/views/Home";
import Profile from "@/views/Profile";
import Group from "@/views/Group";
import Tasks from "@/views/Tasks";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/registration",
    name: "Registration",
    component: Registration,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/group",
    name: "Group",
    component: Group,
  },
  {
    path: "/task",
    name: "Task",
    component: Tasks,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
