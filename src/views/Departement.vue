<template>
  <VueEchelle libEchelle="département"
              idEchelle="dep"
              idGeo="insee_dep"
              libGeo="lib_dep">
  </VueEchelle>
</template>

<script>
// @ is an alias to /src
import VueEchelle from "@/components/VueEchelle.vue";


export default {
  components: {
    VueEchelle,
  }
}
</script>