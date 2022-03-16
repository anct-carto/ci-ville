<template>
  <div class="row">
    <div class="col-md-5 wrapper" id="sidepanel-container">
      <SidePanel id="sidepanel"/>
    </div>
    <div class="col-7">
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <MapComponent id="map" 
                        :echelle="'dep'"
                        :idGeo="'insee_dep'"
                        :libGeo="'lib_dep'"/>
        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          <Card>
            <div v-if="this.$store.state.filterCode">
              <Table class="widget" id="table-actions"/>
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
