import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Tasks from "@/views/Tasks";
import Workspace from "@/views/Workspace";

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
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/Registration.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/profile/create",
    name: "ProfileCreate",
    component: () => import("../views/ProfileCreate.vue"),
  },
  {
    path: "/group",
    name: "Group",
    component: () => import("../views/Group.vue"),
  },
  {
    path: "/group/create",
    name: "GroupCreate",
    component: () => import("../views/GroupCreate.vue"),
  },
  {
    path: "/group/:id/details",
    name: "GroupDetails",
    component: () => import("../views/GroupDetails.vue"),
    props: true,
  },
  {
    path: "/workspace/:id",
    name: "Workspace",
    component: Workspace,
    props: true,
  },
  {
    path: "/project/:id/tasks",
    name: "Task",
    component: Tasks,
    props: true,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
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
  mode: "history",
});

export default router;
