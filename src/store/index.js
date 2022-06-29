import { createStore } from 'vuex'
import _ from 'underscore'
// import actionsFinancees from '@/assets/actions-2020-2021.json'

export default createStore({
  state: {
    annee:2021,
    echelle:null,
    filterCode:null,
    filterTheme:null,
    themeColor:'gray',
  },
  getters: {
    montant(state) {
      return state.filteredData ? state.filteredData.map(e => e.montant).reduce((a,b) => a + b,0) : 0 
    },
    nbActions(state) {
      return state.filteredData ? state.filteredData.length : 0
    },
    nbStructures(state) {
      if(state.filteredData) {
        let nbStructures = _.chain(state.filteredData)
        .groupBy('raison_sociale')
        .size()
        ._wrapped
        return nbStructures
      } else {
        return 0
      }
    },
    population(state) {
      return !state.filterCode ? 5400000: state.cvList.filter(e => e.codgeo == state.filterCode)[0].pop
    }
  },
  mutations: {
    CHANGE_ECHELLE(state,echelle) {
      // filtre les données en fonction de l'échelle choisie ; par défaut, contrat de ville
      // state.data = actionsFinancees.filter(e => e.annee == state.annee)
      state.data = require(`@/assets/actions-${state.annee}.json`)
      state.echelle = echelle
      switch (echelle) {
        case "National":
          state.data = state.data.filter(e => e.echelle == "nat")
          break;
        case "Région":
          state.data = state.data.filter(e => e.echelle != "nat") // 1. Filtrage sur les échelles concernées par l'option choisie
          state.data.forEach(e => e.codgeo = e.insee_reg) // 2. assignation du code géographique correspond : reg, dep ou cdv 
          break;
        case "Département":
          state.data = state.data.filter(e => e.echelle == "dep" || e.echelle == "cdv")
          state.data.forEach(e => e.codgeo = e.insee_dep)
          break;
        case "Contrat de ville":
          state.data = state.data.filter(e => e.echelle == "cdv")
          state.data.forEach(e => e.codgeo = e.code_cv)
          break;
      }
      state.filteredData = state.data
    },
    UPDATE_COLOR(state,color) {
      state.themeColor = color
    },
    CROSS_FILTER(state,filterParams) {
      // 1. récupère les valeurs de filtres (même si elles sont vides)
      let filterName = filterParams.type;
      let value = filterParams.value;
      switch (filterName) {
        case "theme":
          state.filterTheme = value
          break;
        case "codgeo":
          state.filterCode = value
          break;
      }

      // 2. créé une liste des filtres avec leurs valeurs
      let filters = {theme:state.filterTheme,codgeo:state.filterCode}
      // dans cette liste, supprime les filtres dont la valeur est null
      Object.keys(filters).forEach(e => {
        if(filters[e] === null) {
          delete filters[e]
        }
      })
      // 3. donne moi le nom des filtres obtenus dans une liste / array []
      const selectedFilterKeys = Object.keys(filters)

      // 4. si la liste des filtres est vide ...
      if(state.filterTheme == null && state.filterCode == null) {
        // 4.1 ... renvoie les données par défaut
        state.filteredData = state.data
      } else {
        // 4.2 ... sinon filtre le tableau sur la base de la liste des filtres non vides
        state.filteredData = state.data.filter(e => selectedFilterKeys.every(key => 
            filters[key] === e[key] 
        ))
      }
    },
    CHANGE_ANNEE(state,annee) {
      state.annee = annee;
    },
  },
  actions: {
    crossFilter({commit},filterParams) {
      commit('CROSS_FILTER',filterParams)
    },
    updateThemeColor({commit},color) {
      commit('UPDATE_COLOR',color)
    },
    resetTheme({commit}) {
      commit('UPDATE_COLOR','gray')
      commit('CROSS_FILTER',{type:"theme",value:null})
    },
    resetCodegeo({commit}) {
      commit('CROSS_FILTER',{type:"codgeo",value:null})
    },
    changeEchelle({commit},echelle) {
      commit('CHANGE_ANNEE',2021);
      commit('CHANGE_ECHELLE',echelle)
    },
    changeAnnee({commit,state},annee) {
      commit('CHANGE_ANNEE',annee);
      commit('CHANGE_ECHELLE',state.echelle)
      commit('CROSS_FILTER',{type:"theme",value:state.filterTheme})
      commit('CROSS_FILTER',{type:"codgeo",value:state.filterCode})
    },
  },
})