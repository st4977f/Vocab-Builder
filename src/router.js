import Vue from "vue";
import Router from "vue-router";
import Words from "./views/Words.vue";
import New from "./views/New.vue";
import Show from "./views/Show.vue";
import Edit from "./views/Edit.vue";
import Test from "./views/Test.vue";
import User from "./views/User.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.VUE_APP_ROUTER_URL, // Ensure BASE_URL is correctly set in .env file
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "/words",
    },
    {
      path: "/words",
      name: "words",
      component: Words,
    },
    {
      path: "/words/new",
      name: "new-word",
      component: New,
    },
    {
      path: "/words/:id",
      name: "show",
      component: Show,
    },
    {
      path: "/words/:id/edit",
      name: "edit",
      component: Edit,
    },
    {
      path: "/test",
      name: "test",
      component: Test,
    },
    {
      path: "/user",
      name: "user",
      component: User,
    },
  ],
});
