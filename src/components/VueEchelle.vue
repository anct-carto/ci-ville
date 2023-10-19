<template>
      <div class="row">
          <LayoutTop/>
      </div>
      <div class="row">
          <div :class="'col-sm-'+colWidth" id="sidepanel-container">
              <SidePanel id="sidepanel"/>
          </div>
          <div class="col-sm-7 map-container" v-if="idEchelle != 'National' | idEchelle != 'Global'">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Montant subventions par {{ libEchelle }}</button>
                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Liste actions subventionnées</button>
                <button class="nav-link" id="nav-postes-tab" data-bs-toggle="tab" data-bs-target="#nav-postes" type="button" role="tab" aria-controls="nav-postes" aria-selected="false">Liste aides à l'emploi</button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent" v-if="libEchelle != 'Global'">
              <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <MapComponent id="map" 
                              :echelle="idEchelle"
                              :idGeo="idGeo"
                              :libGeo="libGeo"
                              v-if="idEchelle"/>
              </div>
              <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <Table id="table-actions"/>
              </div>
              <div class="tab-pane fade" id="nav-postes" role="tabpanel" aria-labelledby="nav-postes-tab">
                  <TablePostes id="table-postes"/>
              </div>
            </div>
          </div>
      </div>
</template>

<script>
// @ is an alias to /src
import MapComponent from '@/components/MapComponent.vue';
import SidePanel from '@/components/SidePanel.vue';
import Table from '@/components/Table.vue';
import TablePostes from '@/components/TablePostes.vue';
import LayoutTop from "@/components/LayoutTop.vue";


export default {
  components: {
    MapComponent,
    SidePanel,
    LayoutTop,
    Table,
    TablePostes,
  },
  props:['libEchelle','idEchelle','idGeo','libGeo'],
  computed:{
    colWidth() {
      return this.libEchelle == 'Global' ? 12 : 5
    }
  },
}
</script>