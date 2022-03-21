import { createRouter, createWebHistory } from "vue-router";
import LikedQuotes from "../views/LikedQuotes.vue";
import HomeView from "../views/HomeView.vue";
import AddQuote from "../views/AddQuote.vue";

/*
  using routes to navigate through all the endpoints
  will redirect to HomeView if a routes does not exist
*/
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
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
  {
    path: "/:pathMatch(.*)*",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
