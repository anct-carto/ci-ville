import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import National from '../views/National.vue'
import Region from '../views/Region.vue'
import Departement from '../views/Departement.vue'
import ContratDeVille from '../views/ContratDeVille.vue'


const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: '/national',
    name: 'National',
    component: National,
  },
  {
    path: '/contrat-de-ville',
    name: 'ContratDeVille',
    component: ContratDeVille
  },
  {
    path: '/departement',
    name: 'Departement',
    component: Departement,
  },
  {
    path: '/region',
    name: 'Region',
    component: Region
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
