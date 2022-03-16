import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: '/national',
    name: 'National',
    component: () => import(/*webpackChunkName: "National"*/ '../views/National.vue'),
  },
  {
    path: '/contrat-de-ville',
    name: 'ContratDeVille',
    component: () => import(/*webpackChunkName: "ContratDeVille"*/ '../views/ContratDeVille.vue'),
  },
  {
    path: '/departement',
    name: 'Departement',
    component: () => import(/*webpackChunkName: "Departement"*/ '../views/Departement.vue'),
  },
  {
    path: '/region',
    name: 'Region',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Region" */ '../views/Region.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
