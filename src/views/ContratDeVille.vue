<template>
    <div class="container-fluid">
      <div class="row no-gutters">
          <div class="col-md-5 wrapper" id="sidepanel-container">
            <SidePanel id="sidepanel"/>
          </div>
          <div class="col-md-7 wrapper p-0 map-container">
            <h5>Nombre d'actions financées par contrat de ville</h5>
            <MapComponent id="map"/>
          </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import MapComponent from '@/components/MapComponent.vue';
import SidePanel from '@/components/SidePanel.vue';

export default {
  components: {
    MapComponent,
    SidePanel,
    // Table:Table
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
}

#sidepanel {
  height: calc(100vh - 34px);
  text-align: left;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
