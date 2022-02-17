<template>
  <div class="home">
    <HelloWorld msg="Ceci est la page d'accueil"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  }
}
</script>
