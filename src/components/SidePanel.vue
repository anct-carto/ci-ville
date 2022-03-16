<template>
      <div id="sidepanel">
        <div class="row">
          <i>Sélectionnez un contrat de ville dans la liste ci-dessous 
            ou sur la carte ci-contre.</i>
          <List :filterCodeFromStore="filterCode"/>
          <div class="col-3">
            <Number :chiffreCle="filteredData.length" 
                    :texte="'actions financées'"
                    />
          </div>
          <div class="col-3">
            <Number :chiffreCle="nbStructures" 
                    :texte="'porteurs de projets'"
                    />
          </div>
          <div class="col-3">
            <Number :chiffreCle="Math.round(montant)" 
                    :texte="'euros engagés'"
                    />
          </div>
          <div class="col-3">
            <Number :chiffreCle="0" 
                    :texte="'habitants en QPV'"
                    />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <Card :title="`Nombre d'actions par thème`" 
                  :about='"Sélectionnez un thème pour filtrer les valeurs des chiffres clés et de la carte"'>
              <ThemeChart/>
            </Card>
          </div>  
        </div>
        <div class="row">
          <div class="col-md-12">
            <Card :title="`Nombre d'actions par sous-thème`"
                  :about='"Sélectionnez un sous-thème pour filtrer la table des actions"'>
              <SubThemeChart v-if="filterKey"/>
            </Card>
          </div>  
        </div>
        <!-- <h5>Liste des actions engagées</h5>
          <div v-if="this.$store.state.filterCode">
            <Table class="widget" />
          </div> -->
      </div>
</template>


<script>

import ThemeChart from "@/components/ThemeChart.vue";
import SubThemeChart from "@/components/SubThemeChart.vue";
import List from "@/components/List.vue";
// import Table from "@/components/Table.vue";
import Number from "@/components/Number.vue";
import Card from "@/components/CardComponent.vue";
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'

export default {
  name: 'SidePanel',
  components: {
    ThemeChart,
    List,
    // Table,
    Number,
    SubThemeChart,
    Card
  },
  computed: {
      ...mapGetters(['nbStructures','montant']),
      ...mapState(['filteredData','filterCode','filterKey']),
  },
  methods: {
    resetData() {
      this.$store.state.filteredData = this.$store.state.data;
      this.$store.commit('clearFilter','cdv')
      this.$store.commit('clearFilter','theme')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
