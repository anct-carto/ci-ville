<template>
  <div class="home">
    <HomeComponent msg="Tableau de bord de suivi des actions menées dans le cadre de la politique de la ville"/>
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
