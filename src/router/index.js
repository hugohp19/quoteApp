import { createRouter, createWebHistory } from "vue-router";
import LikedQuotes from "../views/LikedQuotes.vue";
import TestView from "../views/TestView.vue";
import AddQuote from "../views/AddQuote.vue";

const routes = [
  {
    path: "/",
    name: "test",
    component: TestView,
  },
  {
    path: "/likedquotes",
    name: "LikedQuotes",
    component: LikedQuotes,
  },
  {
    path: "/addquote",
    name: "addquote",
    component: AddQuote,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
