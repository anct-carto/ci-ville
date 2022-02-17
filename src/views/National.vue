<template>
  <div class="home">
    <!-- <HelloWorld msg="This is the home page"/> -->
    <div class="col-4">
      <ThemeChart/>
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
