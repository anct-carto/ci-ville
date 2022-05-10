<template>
  <div id="home">
    <HomeComponent msg="Panorama des actions financées par les subventions politiques de la ville"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue'

export default {
  name: 'Home',
  components: {
    HomeComponent,
  }
}
</script>

<style scoped>

  #home {
    background-image: url('~@/assets/bg-pol-ville.svg');
    background-size: 65%;
    background-position-y: bottom;
    background-position-x: right;
    background-repeat: no-repeat;
    background-origin: border-box;
    height: 95vh;
    /* overflow: hidden !important; */
  }

</style>