import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Panorama from '../views/Panorama.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path:'/panorama',
    name:'Panorama',
    component:Panorama,
    props:true,
    children: [
      {
        path: '/panorama/global',
        name: 'Global',
        component:() => import(/* webpackChunkName: "global" */ '../views/Global.vue')
      },
      {
        path: '/panorama/national',
        name: 'National',
        component:() => import(/* webpackChunkName: "national" */ '../views/National.vue')
      },
      {
        path: '/panorama/region',
        name: 'Région',
        component:() => import(/* webpackChunkName: "region" */ '../views/Region.vue')
      },
      {
        path: '/panorama/departement',
        name: 'Département',
        component:() => import(/* webpackChunkName: "departement" */ '../views/Departement.vue')
      },
      {
        path: '/panorama/contrat-de-ville',
        name: 'Contrat de ville',
        component:() => import(/* webpackChunkName: "contrat-de-ville" */ '../views/ContratDeVille.vue')
      },
    ]
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
