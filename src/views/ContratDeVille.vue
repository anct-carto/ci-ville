<template>
    <!-- <div class="container"> -->
    <!-- <div class="container-fluid"> -->
      <div class="row no-gutters">
          <div class="col-md-5" id="sidepanel-container">
            <SidePanel id="sidepanel"/>
          </div>
          <div class="col-md-7 map-container">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Nombre d'actions par contrat de ville</button>
                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Liste des actions</button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <MapComponent id="map" 
                              :echelle="'cdv'"
                              :idGeo="'code_cv'"
                              :libGeo="'lib_cv'"/>
              </div>
              <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <Card>
                  <div v-if="this.$store.state.filterCode">
                    <Table id="table-actions"/>
                  </div>
                  <div v-else>Sélectionnez un contrat de ville pour afficher la liste des actions menées</div>
                </Card>
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
import Card from '@/components/CardComponent.vue';

export default {
  components: {
    MapComponent,
    SidePanel,
    Table,
    Card
  }
}
</script>

<style scoped>

#sidepanel {
  /* height: calc(100vh - 34px); */
  overflow-y: auto;
  overflow-x: hidden;
}


</style>
