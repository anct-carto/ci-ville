<template>
  <div class="home">
    <HomeComponent msg="Exploration des actions financées par les subventions de la politique de la ville"/>
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
