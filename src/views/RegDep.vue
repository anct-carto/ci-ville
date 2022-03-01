<template>
  <div class="row">
    <div class="col-6">
        <ThemeChart/>
    </div>
    <div class="col-4">
      <h5>Répartition par sous-thème</h5>
      <div v-if="this.$store.state.filterKey">
        <SubThemeChart class="widget"
                        v-if="this.$store.state.filterKey"/><br>
      </div>
      <div v-else><i>Sélectionnez un thème pour voir la répartition par sous-thème</i></div>
    </div>
  </div>
  <div class="row">
    <div class="col-12" v-if="this.$store.state.filterKey">
        <Table/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThemeChart from "@/components/ThemeChart.vue";
import Table from "@/components/Table.vue";

export default {
  components: {
    ThemeChart, Table
  }
}
</script>
