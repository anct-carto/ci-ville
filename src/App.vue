<template>
  <body class="container-fluid d-flex flex-column">
    <!-- ajouter g-0 (gutters=0) permet de ne pas avoir d'ascenseur en horizontal -->
    <div class="row w-100 g-0"> 
      <div id="nav" class="nav">
        <div id="logos">
          <a href="https://agence-cohesion-territoires.gouv.fr/" target="_blank">
            <img :src="logoAnct" id="logo-anct">
          </a>
          <router-link to="/panorama"><img :src="logoApp" id="logo-app"></router-link>
        </div>
        <LayoutTop v-if="this.$route.name != 'A propos'"></LayoutTop>
        <router-link to="/panorama" v-if="this.$route.name == 'A propos'"><i class="fa fa-arrow-left" style="margin-right:5px"></i>Retour à l'accueil</router-link> 
        <router-link to="/a-propos" id="a-propos-btn"><i class="fa fa-question-circle" style="margin-right:5px"></i>En savoir plus</router-link> 
      </div>
      <div class="row app-view">
        <!-- écran de chargement -->
        <Loading v-if="!this.$store.state.filteredData"/>
        <!-- popup pour message non adapté aux téléphones -->
        <PopupEcranMobile/>
        <!-- vues -->
        <router-view/>
      </div>
    </div>
  </body>
</template>

<script>
import logoAnct from "@/assets/img/logo-anct.svg"
import logoApp from "@/assets/img/logo-civille.svg"
import LayoutTop from "./components/LayoutTop.vue"
import Loading from "./components/Loading.vue"
import PopupEcranMobile from "./components/PopupEcranMobile.vue"


export default {
  components:{LayoutTop,Loading,PopupEcranMobile},
  data() {
    return {
      logoAnct:logoAnct,
      logoApp:logoApp,
    }
  },
  watch: {
    $route() {
      if(this.currentRoute | this.currentRoute != this.$route.name) {
        this.updateData(this.$route.name)
      }
      this.currentRoute = this.$route.name;
    }
  },
  mounted() {
    document.title = 'Ci.Ville'
  },
  methods: {
    updateData(filter) {
      this.$store.dispatch('changeEchelle',filter)
      this.$store.dispatch('resetTheme')
      this.$store.dispatch('resetCodegeo')
    },
  },
}
</script>

<style>
/* params généraux */

/* COULEURS GOBALES */
:root {
	--bleu-anct:rgb(41, 49, 115);
	--bleu-second:#5770be;
	--jaune-anct:#ffe800;
	--vert-anct:#00ac8c;
  --rose-gerr:#d24b6b;
	--thumbNumber:"10";
}

/* dimension body hors header (= sans tenir compte de la hauteur de la barre logos + filtres) */
.app-view {
  height:calc(100vh - 110px);
}

@font-face {
  font-family: 'Marianne-Regular';
  src: url('./assets/fonts/Marianne-Regular.woff2');
}

@font-face {
  font-family: 'Marianne-Bold';
  src: url('./assets/fonts/Marianne-Bold.woff2');
}

@font-face {
  font-family: 'Marianne-ExtraBold';
  src: url('./assets/fonts/Marianne-ExtraBold.woff2');
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* params généraux */
html, body {
  font-size:11px;
  font-family: 'Marianne-Regular', Arial, Helvetica, sans-serif !important;
  background-color: #e6eaf5 !important;
  margin:0;
  height: 100%;
}

/* apparence boutons header */
#nav {
  padding: 10px;
  display: flex;
  justify-content: left;
  vertical-align: center;
}

#nav > a  {
  background: none;
  color:var(--rose-gerr);
  border:solid 1px var(--rose-gerr);
  margin: 7px 15px 20px 10px;
  padding:5px;
  border-radius:20px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out !important;
  z-index: 1000;
  font-size: 14px;
}

#nav > a:hover {
  background-color: var(--rose-gerr);
  color:white;
  transition: 0.5s;
}

#nav a.router-link-active {
  background-color: var(--rose-gerr); 
  color:white;
}

/* logos */
#logo-anct {
  width:186px;
  margin-right: 10px; /* cacher le surlignage */
}

#logo-app {
  width:220px;
}

#logos {
  z-index: 1;
}

#a-propos-btn {
  margin-left: auto !important;
}


/* apparence boutons onglets cartes/tableaux */
.nav-link {
  color:var(--rose-gerr) !important;
  font-family: 'Marianne-Bold';
}

.nav-link.active {
  color:var(--bs-body-color) !important
}

@media screen and (min-width: 1200px) {
  .nav-link, .header {
    font-size: 15px !important;
  }
}

@media screen and (max-width: 1200px) {
  .nav-link, .header {
    font-size: 13px !important;
  }
}

/* apparence filtres (excepté la recherche territoire) */
select,option {
  cursor:pointer
}

.form-select {
  border:1px solid #DADAF0;
  border-radius: 8px !important;
  padding:8px 10px;
  height:35px;
}

.form-select:focus {
  border-color: black !important;
  box-shadow: 0 0 0 0.2rem rgba(0,0,0, 0.25) !important;
}

label {
  font-size:13px;
  font-weight: 400;
}

/* import bootstrap TRES IMPORTANT */
@import'~bootstrap/dist/css/bootstrap.css ~font-awesome/css/font-awesome.min.css'

</style>
