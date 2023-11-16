<template>
  <VueEchelle libEchelle="région"
              idEchelle="reg"
              idGeo="insee_reg"
              libGeo="lib_reg">
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