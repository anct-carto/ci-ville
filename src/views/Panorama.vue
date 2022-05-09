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
  mounted() {
    const echelleFromParams = this.$route.params.echelle;
    console.log(this.$route);
    const echelleFromPath = this.$route.fullPath.split('/')[2]
    console.log(echelleFromPath);
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