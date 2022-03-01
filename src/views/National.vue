<template>
  <div class="home">
    <!-- <HelloWorld msg="This is the home page"/> -->
    <div class="col-4">
      <ThemeChart/>
    </div>
    <div class="col-4">
      <h5>Répartition par sous-thème</h5>
      <div v-if="this.$store.state.filterKey">
        <SubThemeChart class="widget"
                        v-if="this.$store.state.filterKey"/><br>
      </div>
      <i v-else>Sélectionnez un thème pour voir la répartition par sous-thème</i>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ThemeChart from "@/components/ThemeChart.vue";

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    ThemeChart
  }
}

</script>
