import { createStore } from 'vuex'
import * as aq from 'arquero'
import actionsFinancees from '@/assets/actions-2020.json'


export default createStore({
  state: {
    // data:actionsFinancees,
    // filteredData:actionsFinancees,
    map:'',
    filterCode:null,
    filterKey:null,
    themeColor:'gray',
    filters:[]
  },
  getters: {
    nbStructures(state) {
      return aq.from(state.filteredData)
      .groupby('raison_sociale')
      .count()
      .objects().length;
    },
    montant(state) {
      return state.filteredData.map(e => e.montant).reduce((a,b) => a + b,0);
    },
  },
  mutations: {
    updateThemeColor(state,color) {
      state.themeColor = color
    },
    crossFilter(state,filterParams) {
      let type = filterParams.type;
      let value = filterParams.value;

      switch (type) {
        case "theme":
          state.filterKey = value;
          if(state.filterCode) {
            console.log("filtre actif sur THEME et CDV");
            state.filteredData = state.data.filter(e => e.theme == value & e.code_cv == state.filterCode);
          } else {
            console.log("filtre actif sur THEME");
            state.filteredData = state.data.filter(e => e.theme == value);
          }
          break;
        case "cdv":
          state.filterCode = value;
          if(state.filterKey) {
            console.log("filtre actif sur CDV et THEME");
            state.filteredData = state.data.filter(e => e.code_cv == value & e.theme == state.filterKey);
          } else {
            console.log("filtre actif sur CDV");
            state.filteredData = state.data.filter(e => e.code_cv == value);
          }
          break;
      }
    },
    clearFilter(state,filter) {
      switch (filter) {
        case "cdv":
          state.filterCode = null
          break;
        case "theme":
          console.log("filtre thème effacé");
          state.filterkey = null
          state.filteredData = state.data
          state.themeColor = 'gray'
          break;
      }
    },
    getDataByPage(state,filter) {
      console.log(filter);
      switch (filter) {
        case "National":
          state.data = actionsFinancees.filter(e => e.echelle == "nat")
          state.filteredData = state.data
          break;
        case "Region":
          state.data = actionsFinancees.filter(e => e.echelle == "reg")
          state.filteredData = state.data
          break;
        case "Departement":
          state.data = actionsFinancees.filter(e => e.echelle == "dep")
          state.filteredData = state.data
          break;
        case "ContratDeVille":
          state.data = actionsFinancees.filter(e => e.echelle == "cdv")
          state.filteredData = state.data
          break;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})