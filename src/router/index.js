import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: '/national',
    name: 'National',
    component:() => import(/* webpackChunkName: "national" */ '../views/National.vue')
  },
  {
    path: '/contrat-de-ville',
    name: 'Contrat de Ville',
    component:() => import(/* webpackChunkName: "contrat-de-ville" */ '../views/ContratDeVille.vue')
  },
  {
    path: '/departement',
    name: 'Département',
    component:() => import(/* webpackChunkName: "departement" */ '../views/Departement.vue')
  },
  {
    path: '/region',
    name: 'Région',
    component:() => import(/* webpackChunkName: "region" */ '../views/Region.vue')
  },
  {
    path: '/a-propos',
    name: 'A propos',
    component: About
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
