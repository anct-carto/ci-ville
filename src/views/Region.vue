<template>
      <div class="row ">
          <div class="col-sm-5 d-flex flex-column h-100" id="sidepanel-container">
              <SidePanel id="sidepanel"/>
          </div>
          <div class="col-sm-7 map-container">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Nombre d'actions par région</button>
                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Liste des actions</button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <MapComponent id="map" 
                              :echelle="'reg'"
                              :idGeo="'insee_reg'"
                              :libGeo="'lib_reg'"/>
              </div>
              <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div v-if="this.$store.state.filterCode">
                  <Table id="table-actions"/>
                </div>
                <div v-else>Sélectionnez une région pour consulter la liste des actions</div>
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

export default {
  components: {
    MapComponent,
    SidePanel,
    Table,
  }
}
</script>
