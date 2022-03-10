<template>
  <div class="home">
    <!-- <HelloWorld msg="This is the home page"/> -->
    <div class="col-4">
      <Card :title='"Répartition par thème"'>
        <ThemeChart/>
      </Card>
    </div>
    <div class="col-4">
      <div v-if="this.$store.state.filterKey">
        <Card :title='"Répartition par sous-thème"'>
          <SubThemeChart v-if="this.$store.state.filterKey"/><br>
        </Card>
      </div>
      <i v-else>Sélectionnez un thème pour voir la répartition par sous-thème</i>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ThemeChart from "@/components/ThemeChart.vue";
import Card from "@/components/CardComponent.vue"

export default {
  name: 'Home',
  components: {
    ThemeChart,
    Card
  }
}

</script>
