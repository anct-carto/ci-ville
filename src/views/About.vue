<template>
  <div>
    <h3>Source des données et licence</h3>
    <p>Dauphin, GISPro, lien vers data-gouv ... etc.</p>
    <h3>Réalisation</h3>
    <p>Service cartographie de l'ANCT avec l'appui de la mission Vie associative + code source</p>
    <h3>Contact</h3>
    <p>adresses email</p>
    <h3>Liens utiles</h3>
    <ul>
      <li>Lien 1</li>
      <li>Lien 2</li>
    </ul>
  </div>
  <div class="footer">
        <img :src="logo_anct" alt="" id="logo-anct"><br><br>
  </div>
</template>

<script>
import logo_anct from "@/assets/logo_anct.png"

export default {
  name: 'About',
  data() {
    return {
      logo_anct:logo_anct,
    }
  }
}
</script>

<style scoped>
  #logo-anct {
    bottom:0px;
    width:400px;
  }

</style>