import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/Login'
import MakeWish from '../views/MakeWish/MakeWish'
import Dashboard from '../views/Dashboard/Dashboard'

import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      publica: true
    }
  },
  {
    path: '/NewUser',
    name: 'Novo Usuário',
    component: () => import(/* webpackChunkName: "registrar" */ '../views/Login/NewUser/NewUser.vue'),
    meta: {
      publica: true
    }
  },
  {
    path: '/MakeWish',
    name: 'Cadastrar Pedidos',
    component: MakeWish
  },
  {
    path: '/Dashboard',
    name: 'Gerenciar Pedidos',
    component: Dashboard
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//Titles of pages
const DEFAULT_TITLE = 'App Make Your Wish';
router.beforeEach((to, from, next) => {
  document.title =  DEFAULT_TITLE;
  next();

});

// Global'Guardian' method: protects non-public pages
router.beforeEach((routeTo, routeFrom, next) => {
  if (!routeTo.meta.publica && !store.state.token) {
    console.log('Cannot access not logged in!')
    return next({
      path: '/'
    });
  }
  next();
})

export default router
