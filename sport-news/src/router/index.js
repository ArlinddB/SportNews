import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/login',
      name: 'login',
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
          component: () => 
            import(
              '../views/categories/CategoryList.vue'
            )
        },
        {
          name: 'category-create',
          path: 'create',
          component: () => 
            import(
              '../views/categories/CategoryCreateView.vue'
            )
        }
      ]
    },
    {
      path: '/404',
      name: '404',
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