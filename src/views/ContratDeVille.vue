<template>
    <!-- <div class="container"> -->
    <div class="container-fluid">
      <div class="row no-gutters">
          <div class="col-md-5 wrapper" id="sidepanel-container">
            <SidePanel id="sidepanel"/>
          </div>
          <div class="col-md-7 wrapper map-container">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Nombre d'actions par contrat de ville</button>
                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Liste des actions</button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <MapComponent id="map"/>
              </div>
              <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div v-if="this.$store.state.filterCode">
                  <Table class="widget" id="table-actions" />
                </div>
                <div v-else>Sélectionnez un contrat de ville pour afficher la liste des actions menées</div>
              </div>
            </div>
            <!-- <h5>Nombre d'actions financées par contrat de ville</h5>
            <MapComponent id="map"/> -->
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
    Table:Table
  },
  computed: {
    resultList() {
      return this.$store.state.resultsList
    }
  },
}
</script>

<style scoped>



html, body {
  font-size:.7em;
  width: 100%;
  height:100%;
  /* overflow:hidden; */
}

.map-container {
  text-align: left;
}

.wrapper {
  background: rgb(240,240,240);  
  background-color: #eef3ff;
}

#sidepanel {
  height: calc(100vh - 34px);
  text-align: left;
  overflow-y: auto;
  overflow-x: hidden;
}


</style>
