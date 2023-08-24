<template>
      <div id="sidepanel" class="d-flex flex-column h-100">
        <div class="row">
              <div class="col-3 d-flex flex-column">            
                  <Number :chiffreCle="Math.round(montant)" 
                          :texte="'Montant engagé (€)'"
                          />
                  <Number :chiffreCle="nbActions" 
                          :texte="`Actions financées`"
                          />
                  <Number :chiffreCle="nbStructures" 
                          :texte="'Porteurs de projets'"
                          />
                  <Number :chiffreCle="population" 
                          :texte="'Habitants en QPV'"
                          />
                  <Number :chiffreCle="Math.round(montant)" 
                          :texte="'Montant engagé (€)'"
                          />
                  <Number :chiffreCle="nbActions" 
                          :texte="`Actions financées`"
                          />
                  <Number :chiffreCle="nbStructures" 
                          :texte="'Porteurs de projets'"
                          />
                  <Number :chiffreCle="population" 
                          :texte="'Habitants en QPV'"
                          />
                  <Number :chiffreCle="population" 
                          :texte="'Habitants en QPV'"
                          />
              </div>
            <div class="col-9 d-flex flex-column h-100">
                <Card :title="`Répartition par pilier`" 
                      :about='"Sélectionnez un thème pour filtrer les chiffres clés, la carte et la répartition dans les sous-thèmes correspondants"'>
                  <ThemeChart/>
                </Card>
                <Card :title="`Répartition par sous-thème de pilier`"
                      :about="`Survolez chaque barre pour connaître le sous-thème correspondant et la valeur exacte de son montant.`">
                  <SubThemeChart v-if="filterTheme"/>
                  <span class="msg-else" v-else>Sélectionnez un thème pour accéder à la répartition par sous-thème</span>
                </Card>
          </div>
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
  name: 'SidePanel',
  components: {
    ThemeChart,
    SubThemeChart,
    Number,
    Card,
  },
  computed: {
      ...mapGetters(['nbActions','nbStructures','montant','population']),
      ...mapState(['filteredData','filterCode','filterTheme']),
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
  position: absolute;
  text-align: center;
  width: 100%;
}

</style>
