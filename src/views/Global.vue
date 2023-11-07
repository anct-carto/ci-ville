<template>
  <div id="container">
    <div class="row gx-1">
        <Number :chiffreCle="montantSubventions + montantFonjep + montantAdulteRelais" 
              class="col-sm-1"
              :texte="'Montant engagé (€)'"
                />
        <Number :chiffreCle="Math.round(montantSubventions)" 
        class="col-sm-1"
                :texte="`dont subventions`"
                />
        <Number :chiffreCle="montantFonjep" 
        class="col-sm-1"
                :texte="'dont Fonjep'"
                />
        <Number :chiffreCle="montantAdulteRelais" 
        class="col-sm-1"
                :texte="'dont Adulte-relais'"
                />
        <Number :chiffreCle="nbActions" 
        class="col-sm-1"
                :texte="`Actions financées`"
                :color="color.bleuGrandeEquipe"
                />
        <Number :chiffreCle="nbStructures" 
        class="col-sm-1"
                :texte="'Porteurs de projets'"
                :color="color.bleuGrandeEquipe"
                />
        <Number :chiffreCle="nbFonjep" 
        class="col-sm-1"
                :texte="'Postes Fonjep'"
                :color="color.bleuGrandeEquipe"
                />
        <Number :chiffreCle="nbAdulteRelais" 
        class="col-sm-1"
                :texte="'Postes Adulte-relais'"
                :color="color.bleuGrandeEquipe"
                />
        <Number :chiffreCle="population" 
        class="col-sm-1"
                :texte="'Habitants en QPV'"
                :color="color.bleuGrandeEquipe"
                />
      </div>
      <div class="row h-100 gx-1" id="charts">
          <Card class="col-sm-5"
          :title="`Répartition subventions par pilier de contrat de ville`" 
                :about='"Sélectionnez un thème pour filtrer les chiffres clés, la carte et la répartition dans les sous-thèmes correspondants"'>
            <ThemeChart/>
          </Card>
          <Card class="col-sm-5"
                :title="`Répartition subventions par sous-thème`"
                :about="`Survolez chaque barre pour connaître le sous-thème correspondant et la valeur exacte de son montant.`">
            <SubThemeChart v-if="filterTheme"/>
            <span class="msg-else" v-else>Sélectionnez un pilier pour voir à la répartition par sous-thème</span>
          </Card>
    </div>
  </div>
</template>

<script>

import ThemeChart from "@/components/ThemeChart.vue";
import SubThemeChart from "@/components/SubThemeChart.vue";
import Number from "@/components/Number.vue";
import Card from "@/components/CardComponent.vue";
import {mapGetters} from 'vuex'
import {mapState} from 'vuex'

export default {
  name: 'Global',
  components: {
    ThemeChart,
    SubThemeChart,
    Number,
    Card,
  },
  data() {
    return {
      color:{
        roseGrandeEquipe:"#d24b6b",
        bleuGrandeEquipe:'#5770be',
      }
    }
  },
  computed: {
      ...mapGetters(['nbActions','nbStructures','montantSubventions','montantFonjep','montantAdulteRelais','nbFonjep','nbAdulteRelais','population']),
      ...mapState(['filteredData','filterCode','filterTheme']),
  },
}

</script>

<style scoped>
  #container {
    height: 83vh;
    display: flex;
    flex-direction: column;
  }

  .chiffre-cle-wrapper {    
    margin-right:10px;
  }

  .widget {
    margin-right: 10px;
  }
</style>