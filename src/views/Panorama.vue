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
    const echelle = this.$route.params.echelle;
    echelle ? this.$router.push({path:`/panorama/${echelle}`}) : this.$router.push({path:`/panorama/contrat-de-ville`}) 
  }
}
</script>