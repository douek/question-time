import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Question from "../components/Question";
import QuestionEditor from "../components/QuestionEditor";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/ask",
    name: "ask",
    component: QuestionEditor
  },
  {
    path: "/question/:slug",
    name: "question",
    component: Question,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  //base: process.env.BASE_URL,
  routes
});

export default router;
