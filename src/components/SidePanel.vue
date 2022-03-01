<template>
      <div id="sidepanel">
        <i>Sélectionnez un contrat de ville dans la liste ci-dessous 
          ou sur la carte ci-contre.</i>
        <div class="row">
          <List :filterCodeFromStore="this.$store.state.filterCode"/>
          <div class="col-3">
            <Number :chiffreCle="this.$store.state.filteredData.length" 
                    :texte="'actions financées'"
                    v-if="this.$store.state.filteredData"
                    class="widget"/>
          </div>
          <div class="col-3">
            <Number :chiffreCle="this.$store.getters.nbStructures" 
                    :texte="'structures'"
                    class="widget"/>
          </div>
          <div class="col-3">
            <Number :chiffreCle="Math.round(this.$store.getters.montant)" 
                    :texte="'euros engagés'"
                    class="widget"/>
          </div>
          <div class="col-3">
            <Number :chiffreCle="'XX'" 
                    :texte="'habitants en QPV'"
                    class="widget"/>
          </div>
          <div class="col-3">
            <!-- <br><button class="btn btn-primary" @click="resetData">Réinitialiser</button> -->
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <h5>Répartition par thème</h5>
            <ThemeChart class="widget"/><br>
          </div>
          <div class="col-6">
            <h5>Répartition par sous-thème</h5>
            <div v-if="this.$store.state.filterKey">
              <SubThemeChart class="widget"
                              v-if="this.$store.state.filterKey"/><br>
            </div>
            <i v-else>Sélectionnez un thème pour voir la répartition par sous-thème</i>
          </div>
        </div>
        <h5>Liste des actions engagées</h5>
          <div v-if="this.$store.state.filterCode">
            <Table class="widget" />
          </div>
      </div>
</template>


<script>

import ThemeChart from "@/components/ThemeChart.vue";
import SubThemeChart from "@/components/SubThemeChart.vue";
import List from "@/components/List.vue";
import Table from "@/components/Table.vue";
import Number from "@/components/Number.vue";

export default {
  name: 'SidePanel',
  components: {
    ThemeChart,
    List,
    Table,
    Number,
    SubThemeChart
  },
  methods: {
    resetData() {
      console.log("hey");
      this.$store.state.filteredData = this.$store.state.data;
      this.$store.commit('clearFilter','cdv')
      this.$store.commit('clearFilter','theme')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.widget {
  background: white;
  box-shadow: 0 2px 2px rgba(0,0,0,.02), 0 0px 2px rgba(0,0,0,.01);
  border-radius: 5px;
}

.row {
  margin-bottom: 10px;
}

</style>
