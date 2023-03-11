import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { title: "Home" },
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { title: "Login" },
    component: () => import("../views/user/Login.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    children: [
      {
        name: "categories-list",
        path: "",
        meta: { title: "Categories" },
        component: () => import("../views/categories/CategoryList.vue"),
      },
      {
        name: "categories-create",
        path: "create",
        meta: { title: "Create" },
        component: () => import("../views/categories/CategoryCreateView.vue"),
      },
      {
        name: "categories-edit",
        path: "edit/:id",
        meta: { title: "Edit" },
        component: () => import("../views/categories/CategoryEditView.vue"),
        params: true,
      },
      {
        name: "categories-details",
        path: "details/:id",
        meta: { title: "Details" },
        component: () => import("../views/categories/CategoryDetailsView.vue"),
        params: true,
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    meta: { title: "Register" },
    component: () => import("../views/user/Register.vue"),
  },

  {
    path: "/news",
    name: "news",
    children: [
      {
        name: "football-list",
        path: "football",
        meta: { title: "Football News" },
        component: () => import("../views/football/news/newsList.vue"),
      },
    ],
  },
  {
    path: "/standings",
    name: "standings-list",
    children: [
      {
        name: "football-standings",
        path: "football",
        meta: { title: "Football Standings" },
        component: () => import("../views/football/standings/standings.vue"),
      },
    ],
  },
  {
    path: "/posts",
    name: "posts",
    children: [
      {
        name: "posts-list",
        path: "list",
        meta: { title: "Posts" },
        component: () => import("../views/posts/PostsList.vue"),
      },
      {
        name: "posts-create",
        path: "create",
        meta: { title: "Create" },
        component: () => import("../views/posts/PostsCreate.vue"),
      },
      {
        name: "posts-edit",
        path: "edit/:id",
        meta: { title: "Edit" },
        component: () => import("../views/posts/PostsEdit.vue"),
      },
      {
        name: "posts-details",
        path: "details/:id",
        meta: { title: "Details" },
        component: () => import("../views/posts/PostsDetails.vue"),
      },
      {
        name: "posts-page",
        path: ":id",
        meta: { title: "Post" },
        component: () => import("../views/posts/PostsPage.vue"),
      },
    ],
  },
  {
    path: "/users",
    name: "users",
    children: [
      {
        name: "users-list",
        path: "list",
        meta: { title: "Users" },
        component: () => import("../views/user/UserList.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: { title: "Dashboard" },
    component: () => import("../views/dashboard/DashboardView.vue"),
  },
  {
    path: "/NotFound",
    name: "404",
    meta: { title: "Not Found" },
    component: () => import("../views/FourOFourView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const guestRouteNames = ["login", "register"];

const routeNames = routes.flatMap((route) =>
  route.children
    ? route.children.flatMap((route) => route.name).concat(route.name)
    : route.name
);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + " - SportNews";
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (guestRouteNames.includes(to.name) && user) {
      next({ name: "home" });
      return;
    } else if (!routeNames.includes(to.name)) {
      next({ name: "404" });
    } else {
      next();
      return;
    }
  });
});

export default router;
