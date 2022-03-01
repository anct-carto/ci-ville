<template>
  <div class="row">
    <div class="col-6">
        <ThemeChart/>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
        <Table/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ThemeChart from "@/components/ThemeChart.vue";
import Table from "@/components/Table.vue";

export default {
  name: 'Home',
  components: {
    ThemeChart, Table
  }
}
</script>
