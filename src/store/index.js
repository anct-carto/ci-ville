import { createStore } from 'vuex'
import * as aq from 'arquero'
import actionsFinancees from '@/assets/actions_financees2.json'


export default createStore({
  state: {
    // data:actionsFinancees,
    filteredData:actionsFinancees,
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
          console.log("HEY");
          state.filterkey = null
          state.filteredData = state.data
          break;
      }
    },
    getDataByPage(state,filter) {
      console.log(filter);
      if(filter == "National") {
        console.log(filter);
        state.data = actionsFinancees.filter(e => e.code_cv == "HORSCONTVILLE")
      } else {
        state.data = actionsFinancees.filter(e => e.code_cv != "HORSCONTVILLE")
      }
    }
  },
  actions: {
  },
  modules: {
  }
})