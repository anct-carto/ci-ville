<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Panorama',
  mounted() {
    this.$router.push({path:'/panorama/contrat-de-ville'})
  }
}
</script>