import { createStore } from 'vuex'
import _ from 'underscore'

export default createStore({
  state: {
    annee:2022,
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
      for(let i = 0;i<state.data.length;i++) {
        // label thème
        let theme = state.data[i].theme 
        switch (theme) {
          case "1":
            theme = "1 - Cohésion sociale"
            break;
          case "2":
            theme = "2 - Développement économique et emploi"
            break;
          case "3":
            theme = "3 - Cadre de vie et renouvellement urbain"
            break;
          case "4":
            theme = "4 - Pilotage, ingénierie, ressources et évaluations"
            break;
        }
        state.data[i].theme = theme;

        // label sous thème
        let sous_theme = state.data[i].sous_theme 
        switch (sous_theme) {
          case "1.1":
            sous_theme = "1.1 - Education"
            break;
          case "1.2":
            sous_theme = "1.2 - Santé"
            break;
          case "1.3":
            sous_theme =  "1.3 - Parentalité et droits sociaux"
            break;
          case "1.4":
            sous_theme =  "1.4 - Culture et expression artistique"
            break;
          case "1.5":
            sous_theme =  "1.5 - Lien social, citoyenneté et participation des habitants"
            break;
          case "1.5a":
            sous_theme =  "1.5a - Jeunesse"
            break;
          case "1.5b":
            sous_theme =  "1.5b - Sport et loisir"
            break;
          case "1.6":
            sous_theme =  "1.6 - Prévention et lutte contre les discriminations liées à l'origine et à l'adresse"
            break;
          case "2.1":
            sous_theme =  "2.1 - Emploi"
            break;
          case "2.2":
            sous_theme =  "2.2 - Développement économique"
            break;
          case "3.1":
            sous_theme =  "3.1 - Cadre de vie et renouvellement urbain" 
            break;
          case "3.2":
            sous_theme =  "3.2 - Tranquillité et sûreté publique"
            break;
          case "4.1":
            sous_theme =  "4.1 - Pilotage, ingénierie, ressources et évaluations"
            break;
          case "4.2":
            sous_theme =  "4.2 - Structures mutualisatrices"
            break;
          }
          state.data[i].sous_theme = sous_theme;
      }

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
    async CHANGE_ANNEE(state,annee) {
      state.annee = annee;
      state.data = require(`@/assets/actions-${state.annee}.json`)
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
      commit('CHANGE_ANNEE',2022);
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