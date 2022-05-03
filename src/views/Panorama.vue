<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'Panorama',
  mounted() {
    console.log(this.$route);
    this.$router.push({path:'/panorama/contrat-de-ville'})
  }
}
</script>