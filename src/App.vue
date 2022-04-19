<template>
  <body class="container-fluid d-flex flex-column">
    <!-- ajouter g-0 (gutters=0) permet de ne pas avoir d'ascenseur en horizontal -->
    <div class="row w-100 g-0"> 
        <div id="nav" class="nav">
          <router-link to="/">Accueil</router-link> 
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              Exploration
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <span>Hors contrat de ville</span>
              <router-link to="/national">National</router-link> 
              <router-link to="/region">Région</router-link> 
              <router-link to="/departement">Département</router-link> 
              <span>
                En contrat de ville
              </span>
              <router-link to="/contrat-de-ville">Contrat de ville</router-link> 
            </ul>
          </div>
          <router-link to="/a-propos">À propos</router-link> 
        </div>
      <div class="row app-view vh-100">
        <router-view/>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  watch: {
    $route() {
      if(this.currentRoute | this.currentRoute != this.$route.name) {
        this.updateData(this.$route.name)
      }
      this.currentRoute = this.$route.name;
    }
  },
  methods: {
    updateData(filter) {
      this.$store.commit('getDataByPage',filter)
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
	--font-size-global:1.1em;
	--thumbNumber:"10";
}

.app-view {
  padding:10px
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
  font-size:12.5px;
  font-family: 'Marianne-Regular', Arial, Helvetica, sans-serif !important;
  background-color: #e6eaf5 !important;
  margin:0;
  height: 100%;
  text-align: center;
}


#nav {
  /* background: #5473b6; */
  padding: 0px;
  display: flex;
  justify-content: center;
}

#dropdownMenu2 {
  background: none;
  border:none;
  text-transform: uppercase;
  color: var(--bleu-second); 
}

#nav a  {
  text-transform: uppercase;
  color: var(--bleu-second); 
  padding: 5px 10px 2px 10px;
  text-decoration: none;
  display: block;
  text-align: center;
}

.dropdown-menu {
  width: 200px;
}

#nav a:hover, a.router-link-exact-active {
  /* background: #3c6cd3; */
  border-bottom: solid 3px var(--bleu-second);   
  font-family: 'Marianne-Bold';
}

a.router-link-exact-active {
  border-bottom: solid 3px var(--bleu-second);   
}

.nav-link {
  font-family: 'Marianne-Bold';
  font-size: 1.2em !important;
}


@import'~bootstrap/dist/css/bootstrap.css'

</style>
