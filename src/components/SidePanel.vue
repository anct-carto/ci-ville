<template>
      <div id="sidepanel" class="d-flex flex-column h-100">
        <div class="row">
          <div class="col-12">
            <div class="row">
              <div class="col-3">
                <ListEchelle/>
              </div>
              <div class="col-2">
                <ListYear/>
              </div>
              <div class="col-7" v-if="this.$route.name != 'National'">
                <ListGeo id="select-territoire" :filterCodeFromStore="filterCode"/>
              </div>
            </div>
          </div>
          <div class="col-4">
            <Number :chiffreCle="nbActions" 
                    :texte="`Actions financées`"
                    />
          </div>
          <div class="col-4">
            <Number :chiffreCle="nbStructures" 
                    :texte="'Porteurs de projets'"
                    />
          </div>
          <div class="col-4">
            <Number :chiffreCle="Math.round(montant)" 
                    :texte="'Montant engagé (€)'"
                    />
          </div>
          <!-- <div class="col-3">
            <Number :chiffreCle="0" 
                    :texte="'habitants en QPV'"
                    />
          </div> -->
        </div>
          <Card :title="`Répartition des actions par thème`" 
                :about='"Sélectionnez un thème pour filtrer les valeurs des chiffres clés et de la carte"'>
            <ThemeChart/>
          </Card>
          <Card :title="`Répartition des actions par sous-thème`"
                :about='"Sélectionnez un sous-thème pour filtrer la table des actions"'>
            <SubThemeChart v-if="filterKey"/>
            <span class="msg-else" v-else>Sélectionnez un thème pour accéder à la répartition par sous-thème</span>
          </Card>
        <!-- <h5>Liste des actions engagées</h5>
          <div v-if="this.$store.state.filterCode">
            <Table class="widget" />
          </div> -->
      </div>
</template>


<script>

import ThemeChart from "@/components/ThemeChart.vue";
import SubThemeChart from "@/components/SubThemeChart.vue";
import ListGeo from "@/components/ListGeo.vue";
import ListYear from "@/components/ListYear.vue";
import ListEchelle from "@/components/ListEchelle.vue";
// import Table from "@/components/Table.vue";
import Number from "@/components/Number.vue";
import Card from "@/components/CardComponent.vue";
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'

export default {
  name: 'SidePanel',
  components: {
    ThemeChart,
    SubThemeChart,
    ListGeo,
    ListYear,
    ListEchelle,
    Number,
    Card,
  },
  computed: {
      ...mapGetters(['nbActions','nbStructures','montant']),
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

.msg-else {
  font-style: italic;
  display: flex;
  justify-content: center;
  vertical-align: middle;
}

</style>
