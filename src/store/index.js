import { createStore } from 'vuex'
import _ from 'underscore'
import actionsFinancees from '@/assets/actions-2020-2021.json'

// const actions2020 = actionsFinancees.filter(e=> e.annee == 2020)
// const actions2021 = actionsFinancees.filter(e=> e.annee == 2021)

// const dataNat = actionsFinancees.filter(e => e.echelle == "nat")
// const dataReg = actionsFinancees.filter(e => e.echelle == "reg")
// const dataDep= actionsFinancees.filter(e => e.echelle == "dep")
// const dataCdv = actionsFinancees.filter(e => e.echelle == "cdv")

export default createStore({
  state: {
    annee:2021,
    filterCode:null,
    filterKey:null,
    themeColor:'gray',
  },
  getters: {
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
    montant(state) {
      return state.filteredData ? state.filteredData.map(e => e.montant).reduce((a,b) => a + b,0) : 0 
    },
  },
  mutations: {
    updateThemeColor(state,color) {
      state.themeColor = color
    },
    crossFilter(state,filterParams) {
      let type = filterParams.type;
      let value = filterParams.value;

      let data = state.data

      switch (type) {
        case "theme":
          console.log(value); // brest metropole
          state.filterKey = value;
          if(state.filterCode) {
            console.log("filtre actif sur THEME et CDV");
            // state.filteredData = state.data.filter(e => e.theme == value & e.codgeo == state.filterCode);
            state.filteredData = data.filter(e => e.theme == value & e.codgeo == state.filterCode);
          } else {
            console.log("filtre actif sur THEME");
            state.filteredData = data.filter(e => e.theme == value);
          }
          break;
        case "cdv":
          state.filterCode = value;
          // debugger; // eslint-disable-line no-debugger
          if(state.filterKey) {
            console.log("filtre actif sur CDV et THEME");
            state.filteredData = data.filter(e => e.codgeo == value & e.theme == state.filterKey);
          } else {
            console.log("filtre actif sur CDV");
            state.filteredData = data.filter(e => e.codgeo == value);
          }
          break;
      }
    },
    // clearFilter(state,filter) {
    //   switch (filter) {
    //     case "cdv":
    //       state.filterCode = null
    //       break;
    //     case "theme":
    //       console.log("filtre thème effacé");
    //       state.filterkey = null
    //       state.filteredData = state.data
    //       state.themeColor = 'gray'
    //       break;
    //   }
    // },
    getDataByPage(state,echelle) {
      state.data = actionsFinancees.filter(e => e.annee == state.annee)
      switch (echelle) {
        case "National":
          // state.data = dataNat
          state.echelle = "nat";
          state.data = state.data.filter(e => e.echelle == "nat")
          break;
        case "Région":
          // state.data = dataReg
          state.echelle = "reg";
          state.data = state.data.filter(e => e.echelle == "reg")
          break;
        case "Département":
          // state.data = dataDep
          state.echelle = "dep";
          state.data = state.data.filter(e => e.echelle == "dep")
          break;
        case "Contrat de Ville":
          // state.data = dataCdv
          state.echelle = "cdv"
          state.data = state.data.filter(e => e.echelle == "cdv")
          break;
      }
      state.filteredData = state.data
    },
    RESET_THEME(state) {
      state.filterKey = null;
      if(state.filterCode) {
        state.filteredData = state.data.filter(e => e.codgeo == state.filterCode)
      } else {
        state.filteredData = state.data
      }
      state.themeColor = 'gray';
    },
    RESET_CODEGEO(state) {
      state.filterCode = null;
      if(state.filterKey) {
        state.filteredData = state.data.filter(e => e.theme == state.filterKey)
      } else {
        state.filteredData = state.data
      }
    },
    CHANGE_ANNEE(state,annee) {
      state.annee = annee;
      state.data = actionsFinancees.filter(e => e.annee == annee && e.echelle == state.echelle)
      state.filteredData = state.data
    },
  },
  actions: {
    resetTheme({commit}) {
      commit('RESET_THEME')
    },
    resetCodegeo({commit}) {
      commit('RESET_CODEGEO')
    },
    changeAnnee({commit},annee) {
      commit('CHANGE_ANNEE',annee);
      // const state = this.state;
      // if(state.filterKey) {
      //   console.log("theme appliqué");
      //   commit('crossFilter',{type:'theme',value:state.filterKey})
      // }
      // if(state.filterCode) {
      //   console.log("geo appliqué");
      //   commit('crossFilter',{type:'cdv',value:state.filterCode})
      // }      
    }
  },
})