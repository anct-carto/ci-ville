import { createStore } from 'vuex'
import * as aq from 'arquero'
import actionsFinancees from '@/assets/actions-2020.json'


export default createStore({
  state: {
    filterCode:null,
    filterKey:null,
    themeColor:'gray',
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
    geoList(state) {
      let sortedArray = state.data.sort((a,b) => {
          if(a.lib_cv<b.lib_cv) return -1
          if(a.lib_cv>b.lib_cv) return 1
          return 0
      });
      let uniqueValues = sortedArray.map(e => {
          let columns = ['lib_cv','code_cv'];
          let key = columns.map(k => e[k]).join('|');
          return [key,e]
      });
      uniqueValues = new Map(uniqueValues);
      return Array.from(uniqueValues.values())
    }
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
          console.log(value); // brest metropole
          state.filterKey = value;
          if(state.filterCode) {
            console.log("filtre actif sur THEME et CDV");
            state.filteredData = state.data.filter(e => e.theme == value & e.code_cv == state.filterCode);
          } else {
            console.log("filtre actif sur THEME");
            state.filteredData = state.data.filter(e => e.theme == value);
          }
          console.table(state.filteredData);
          break;
        case "cdv":
          state.filterCode = value;
          // debugger; // eslint-disable-line no-debugger
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
      switch (filter) {
        case "National":
          state.data = actionsFinancees.filter(e => e.echelle == "nat")
          break;
        case "Region":
          state.data = actionsFinancees.filter(e => e.echelle == "reg")
          break;
        case "Departement":
          state.data = actionsFinancees.filter(e => e.echelle == "dep")
          break;
        case "ContratDeVille":
          state.data = actionsFinancees.filter(e => e.echelle == "cdv")
          break;
      }
      state.filteredData = state.data
    },
    RESET_THEME(state) {
      state.filterKey = null;
      if(state.filterCode) {
        state.filteredData = state.data.filter(e => e.code_cv == state.filterCode)
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
    }
  },
  actions: {
    resetTheme({commit}) {
      commit('RESET_THEME')
    },
    resetCodegeo({commit}) {
      commit('RESET_CODEGEO')
    }
  },
  modules: {
  }
})