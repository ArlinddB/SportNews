import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'home',
      meta: { title: 'Home' },
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Login' },
      component:
      () => import(
        '../views/Login.vue'
      )
    },
    {
      path: '/category',
      name: 'category',
      children: [
        {
          name: 'category-list',
          path: '',
          meta: { title: 'Categories' },
          component: () => 
            import(
              '../views/categories/CategoryList.vue'
            )
        },
        {
          name: 'category-create',
          path: 'create',
          meta: { title: 'Create' },
          component: () => 
            import(
              '../views/categories/CategoryCreateView.vue'
            )
        },
        {
          name: 'category-edit',
          path: 'edit/:id',
          meta: { title: 'Edit' },
          component: () => 
          import(
            '../views/categories/CategoryEditView.vue'
            ),
            params: true,
        },
        {
          name: 'category-details',
          path: 'details/:id',          
          meta: { title: 'Details' },
          component: () => 
          import(
            '../views/categories/CategoryDetailsView.vue'
            ),
            params: true,
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      meta: { title: 'Register' },
      component:
      () => import(
        '../views/Register.vue'
      )
    },

    {
      path: '/football',
      name: 'football',
      children: [
        {
          name: 'news-list',
          path: 'news',
          meta: { title: 'News' },
          component: () => 
            import(
              '../views/football/news/newsList.vue'
            )
        },
        {
          name: 'scores-list',
          path: 'scores',
          meta: { title: 'Scores' },
          component: () => 
            import(
              '../views/fooball/scores/scores.vue'
            )
        }
      ]
    },
   
    {
      path: '/posts',
      name: 'posts',
      children: [
        {
          name: 'posts-list',
          path: 'list',
          meta: { title: 'Posts' },
          component: () => 
            import(
              '../views/posts/PostsList.vue'
            )
        },
        {
          name: 'posts-create',
          path: 'create',
          meta: { title: 'Create' },
          component: () => 
            import(
              '../views/posts/PostsCreate.vue'
            )
        },
        {
          name: 'posts-edit',
          path: 'edit/:id',
          meta: { title: 'Edit' },
          component: () => 
            import(
              '../views/posts/PostsEdit.vue'
            )
        },
        {
          name: 'posts-details',
          path: 'details/:id',
          meta: { title: 'Details' },
          component: () => 
            import(
              '../views/posts/PostsDetails.vue'
            )
        },
        {
          name: 'posts-page',
          path: ':id',
          meta: { title: 'Post' },
          component: () => 
            import(
              '../views/posts/PostsPage.vue'
            )
        },
      ]
    },
    {
      path: '/NotFound',
      name: '404',
      meta: { title: 'Not Found' },
      component:
      () => import(
        '../views/FourOFourView.vue'
      )
    }
  ]
  
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  
  
  const guestRouteNames = [];
  
  const routeNames = routes.flatMap(
    (route) => route.children
      ? route.children.flatMap((route) => route.name).concat(route.name)
      : route.name
  );
  
  router.beforeEach((to, from, next) => {
      document.title = to.meta.title + ' - SportNews'
      if ((guestRouteNames.includes(to.name))) {
        next({ name: 'home' });
      }
      else if (
        !routeNames.includes(to.name)
      ) {
        next({ name: '404' })
      } else {
        next();
      }
  });

  export default router;