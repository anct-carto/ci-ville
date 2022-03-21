<template>
      <div id="sidepanel" class="d-flex flex-column h-100">
        <div class="row ">
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
          <Card :title="`Nombre d'actions par thème`" 
                :about='"Sélectionnez un thème pour filtrer les valeurs des chiffres clés et de la carte"'>
            <ThemeChart/>
          </Card>
          <Card :title="`Nombre d'actions par sous-thème`"
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
    SubThemeChart,
    List,
    // Table,
    Number,
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

.msg-else {
  font-style: italic;
  display: flex;
  justify-content: center;
  vertical-align: middle;
}

</style>
