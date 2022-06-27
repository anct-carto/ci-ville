<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Panorama',
  props: {
    routeTo: {
      type:String,
    }
  },
  watch: {
    $route() {
      if(this.$route.name == "Panorama") {
        this.$router.push({path:`/panorama/contrat-de-ville`})
      }
    }
  },
  mounted() {
    const echelleFromParams = this.$route.params.echelle;
    const echelleFromPath = this.$route.fullPath.split('/')[2]

    if(echelleFromParams) {
       this.$router.push({path:`/panorama/${echelleFromParams}`}) 
    } else if (echelleFromPath) {
      this.$router.push({path:`/panorama/${echelleFromPath}`}) 
    } else {
      this.$router.push({path:`/panorama/contrat-de-ville`})
    }
  }
}
</script>