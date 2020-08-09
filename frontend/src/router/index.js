import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Question from "../components/Question";
import QuestionEditor from "../views/QuestionEditor";
import AnswerEditor from "../views/AnswerEditor";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/ask/:slug?",
    name: "ask",
    component: QuestionEditor,
    props: true
  },
  {
    /// the ? sign makes the slug parameter optional
    path: "/question/:slug",
    name: "question",
    component: Question,
    props: true
  },
  {
    path: "/answer/:id",
    name: "answer-editor",
    component: AnswerEditor,
    props: true
  },
];

const router = new VueRouter({
  mode: "history",
  //base: process.env.BASE_URL,
  routes
});

export default router;
