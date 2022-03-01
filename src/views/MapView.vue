<template>
    <div class="container-fluid">
      <div class="row no-gutters h-100">
          <div class="col-sm-5 wrapper" id="sidepanel-container">
            <SidePanel/>
          </div>
          <div class="col-sm-7 wrapper p-0 map-container">
            <MapComponent ref="map"/>
          </div>
      </div>         
    </div>
</template>

<script>
// @ is an alias to /src
import MapComponent from '@/components/MapComponent.vue';
import SidePanel from '@/components/SidePanel.vue';

export default {
  name: 'MapView',
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


#sidepanel-container{
	box-shadow: 0 10px 10px rgba(0,0,0,.08), 0 4px 8px rgba(0,0,0,.2);
}

h3 {
  padding:10px
}


html, body {
  font-size:.7em !important;
  width: 100%;
  height: 100% !important;
  min-height: 100vh;
}

.container-fluid {
  min-height: 90%;
  height:100% !important;
  flex:1 1 auto;
}

.map-container {
  min-height: 100%;
}

.wrapper {
  background: rgb(240,240,240);  
}

</style>
