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
          <!-- <router-link to="/">Accueil</router-link>  -->
          <router-link to="/a-propos">À propos</router-link> 
        </div>
      <div class="row app-view">
        <!-- écran de chargement -->
        <div id="loading" v-if="!this.$store.state.filteredData">
            <div class="row">
                <div class="spinner-border" role="status"></div>
            </div>
            <div class="row">
                <p>Chargement en cours ...</p>
            </div>
        </div>
        <!-- popup message non adapté aux téléphones -->
        <div class="modal fade" id="exampleModal" tabindex="10000" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Attention</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Ce site n'est pas adapté aux écrans de smartphones et tablettes.  
              </div>
              <div class="modal-footer">
                <button type="button" class="btn-principal" data-bs-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>
        <router-view/>
      </div>
    </div>
  </body>
</template>

<script>
import { Modal } from "bootstrap"
import logoAnct from "@/assets/img/logo-anct.svg"
import logoApp from "@/assets/img/logo-civille.svg"


export default {
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
    document.title = 'CI.Ville'
    let local = localStorage.getItem('session_local');
    if(!local) {
      localStorage.setItem("session_local",'ok')
      const exampleModalEl = document.getElementById('exampleModal');
      const modal = new Modal(exampleModalEl);
      setTimeout(() => modal.show(), 500);
    } 
       
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

:root {
	--bleu-anct:rgb(41, 49, 115);
	--bleu-second:#5770be;
	--jaune-anct:#ffe800;
	--vert-anct:#00ac8c;
  --rose-gerr:#d24b6b;
	--thumbNumber:"10";
}

.app-view {
  padding:10px;
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

html, body {
  font-size:11.5px;
  font-family: 'Marianne-Regular', Arial, Helvetica, sans-serif !important;
  background-color: #e6eaf5 !important;
  margin:0;
  height: 100%;
}


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
  margin: 7px 0px 10px 10px;
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
  font-family: 'Marianne-Bold';
  background-color: var(--rose-gerr); 
  color:white;
  /* border-bottom: solid 2px var(--rose-gerr);
  border-bottom-width: 50% !important; */
}

#logo-anct {
  width:155px;
  margin-right: 10px; /* cacher le surlignage */
}

#logo-app {
  width:180px;
}

#logo-app a.router-link-active {
  font-family: 'Marianne-Bold';
  background-color: none !important; 
  color:white;
} 

#logos {
  z-index: 1;
}

#dropdownMenu2 {
  background: none;
  border:none;
  text-transform: uppercase;
  color: var(--rose-gerr); 
}


  /*Hover effect underline*/
/* #nav a::after {
  content: "";
  display:block;
  margin:0 auto;
  margin-bottom: -2px;
  height: 2px;
  background-color: var(--rose-gerr);
  visibility: hidden;
  z-index: 1000;
  transform: scaleX(0);  
  transition: transform 200ms ease-in-out;
}

#nav a:hover:after {
  visibility: visible;
  transform: scaleX(1);
} */


select,option {
  cursor:pointer
}

#loading {
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  left:0;
  top:0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.7);
  z-index: 20000;
  color:white;
  flex-direction: column;
  overflow-x: hidden;
}


.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.btn-principal {
  font-size: 1.3em;
  border-radius: 20px;
  text-transform: uppercase;
  width: 20%;
  color:white;
  background: var(--rose-gerr);
  border: solid 1px var(--rose-gerr);
  font-family: 'Marianne-Bold';
}

.btn-principal:hover {
  background: none;
  border: solid 1px var(--rose-gerr);
  color: var(--rose-gerr);
}

/* .form-select {
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
} */


@import'~bootstrap/dist/css/bootstrap.css'

</style>
