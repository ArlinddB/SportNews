import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import axios from "axios";

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
        meta: { title: "Categories", requiresAdmin: true },
        component: () => import("../views/categories/CategoryList.vue"),
      },
      {
        name: "categories-create",
        path: "create",
        meta: { title: "Create", requiresAdmin: true },
        component: () => import("../views/categories/CategoryCreateView.vue"),
      },
      {
        name: "categories-edit",
        path: "edit/:id",
        meta: { title: "Edit", requiresAdmin: true },
        component: () => import("../views/categories/CategoryEditView.vue"),
        params: true,
      },
      {
        name: "categories-details",
        path: "details/:id",
        meta: { title: "Details", requiresAdmin: true },
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
        meta: { title: "Posts", requiresAdmin: true },
        component: () => import("../views/posts/PostsList.vue"),
      },
      {
        name: "posts-create",
        path: "create",
        meta: { title: "Create", requiresAdmin: true },
        component: () => import("../views/posts/PostsCreate.vue"),
      },
      {
        name: "posts-edit",
        path: "edit/:id",
        meta: { title: "Edit", requiresAdmin: true },
        component: () => import("../views/posts/PostsEdit.vue"),
      },
      {
        name: "posts-details",
        path: "details/:id",
        meta: { title: "Details", requiresAdmin: true },
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
    path: "/dashboard",
    children: [
      {
        name: "dashboard",
        path: "",
        meta: { title: "Dashboard", requiresAdmin: true },
        component: () => import("../views/dashboard/DashboardView.vue"),
      },
      {
        name: "categories-dashboard",
        path: "categories",
        meta: { title: "Categories", requiresAdmin: true },
        component: () =>
          import("../views/dashboard/categories/CategoriesList.vue"),
      },
      {
        name: "categories-create-dashboard",
        path: "categories/create",
        meta: { title: "Create", requiresAdmin: true },
        component: () =>
          import("../views/dashboard/categories/CategoriesCreate.vue"),
      },
      {
        name: "categories-edit-dashboard",
        path: "categories/edit/:id",
        meta: { title: "Edit", requiresAdmin: true },
        component: () =>
          import("../views/dashboard/categories/CategoriesEdit.vue"),
      },
      {
        name: "categories-details-dashboard",
        path: "categories/details/:id",
        meta: { title: "Details", requiresAdmin: true },
        component: () =>
          import("../views/dashboard/categories/CategoriesDetails.vue"),
      },
      {
        name: "posts-dashboard",
        path: "posts",
        meta: { title: "Posts", requiresAdmin: true },
        component: () => import("../views/dashboard/posts/PostsList.vue"),
      },
      {
        name: "posts-create-dashboard",
        path: "posts/create",
        meta: { title: "Create", requiresAdmin: true },
        component: () => import("../views/dashboard/posts/PostsCreate.vue"),
      },
      {
        name: "posts-edit-dashboard",
        path: "posts/edit/:id",
        meta: { title: "Edit", requiresAdmin: true },
        component: () => import("../views/dashboard/posts/PostsEdit.vue"),
      },
      {
        name: "posts-details-dashboard",
        path: "posts/details/:id",
        meta: { title: "Details", requiresAdmin: true },
        component: () => import("../views/dashboard/posts/PostsDetails.vue"),
      },
      {
        name: "users-dashboard",
        path: "users",
        meta: { title: "Users", requiresAdmin: true },
        component: () => import("../views/dashboard/users/UsersList.vue"),
      },
      {
        name: "users-create-dashboard",
        path: "users/create",
        meta: { title: "Create", requiresAdmin: true },
        component: () => import("../views/dashboard/users/UsersCreate.vue"),
      },
      {
        name: "users-edit-dashboard",
        path: "users/edit/:id",
        meta: { title: "Edit", requiresAdmin: true },
        component: () => import("../views/dashboard/users/UsersEdit.vue"),
      },
      {
        name: "users-details-dashboard",
        path: "users/details/:id",
        meta: { title: "Details", requiresAdmin: true },
        component: () => import("../views/dashboard/users/UsersDetails.vue"),
      },
    ],
  },
  {
    path: "/NotFound",
    name: "404",
    meta: { title: "Not Found" },
    component: () => import("../views/FourOFourView.vue"),
  },
  {
    name: "users-profile",
    path: "/profile",
    meta: { title: "Profile", requiresAuth: true },
    component: () => import("../views/user/UserProfile.vue"),
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
  let role = "";
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  const currentUser = store.state.user.user;
  if (currentUser) {
    axios
      .get(`${process.env.VUE_APP_API}users/${currentUser.uid}`)
      .then((res) => {
        const data = res.data;
        role = data.user?.customClaims;
      });
  }
  document.title = to.meta.title + " - SportNews";
  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAdmin && role.admin != true) {
    next("/NotFound");
  } else if (guestRouteNames.includes(to.name) && currentUser) {
    next({ name: "home" });
  } else {
    next();
  }

  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //   if (guestRouteNames.includes(to.name) && user) {
  //     next({ name: "home" });
  //     return;
  //   } else if (!routeNames.includes(to.name)) {
  //     next({ name: "404" });
  //   } else {
  //     next();
  //     return;
  //   }
  // });
});
export default router;
