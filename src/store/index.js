import { createStore } from 'vuex'
import actionsFinancees from '@/assets/actions_financees2.json'


export default createStore({
  state: {
    data:actionsFinancees,
    filteredData:actionsFinancees,
    map:'',
    filterCode:null,
    filterKey:null,
    themeColor:'gray',
    filters:[]
  },
  mutations: {
    updateThemeColor(state,color) {
      state.themeColor = color
    },
    updateNbActions(state) {
      let montant = state.filteredData.map(e => e.montant).reduce((a,b) => a + b,0);
      state.montant = Math.round(montant);
    },
    crossFilter(state,filterParams) {
      let type = filterParams.type;
      let value = filterParams.value;

      // console.log("type de filtre : " + type + " / valeur de filtre : " + value);
      // console.log(state.filterKey);
      // console.log(state.filterCode);

      switch (type) {
        case "theme":
          if(state.filterCode) {
            console.log("filtre actif sur THEME et CDV");
            state.filteredData = state.data.filter(e => e.theme == value & e.code_cv == state.filterCode);
          } else {
            console.log("filtre actif sur THEME");
            state.filteredData = state.data.filter(e => e.theme == value);
          }
          break;
        case "cdv":
          if(state.filterKey) {
            console.log("filtre actif sur CDV et THEME");
            state.filteredData = state.data.filter(e => e.code_cv == value & e.theme == state.filterKey);
          } else {
            console.log("filtre actif sur CDV");
            state.filteredData = state.data.filter(e => e.code_cv == value);
          }
          break;
      }
      // console.log(state.filteredData.length);
    },
    clearFilter(state,filter) {
      switch (filter) {
        case "cdv":
          state.filterCode = null
          break;
        case "theme":
          console.log("HEY");
          state.filterkey = null
          break;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
