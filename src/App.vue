<template>
  <body class="container-fluid d-flex flex-column p-0">
    <!-- ajouter g-0 (gutters=0) permet de ne pas avoir d'ascenseur en horizontal -->
    <div class="row w-100 vh-100"> 
      <div class="col-1">
        <div id="nav" class="nav">
          <router-link to="/">Accueil</router-link> 
          <router-link to="/national">National</router-link> 
          <router-link to="/region">Région</router-link> 
          <router-link to="/departement">Département</router-link> 
          <router-link to="/contrat-de-ville">Contrat de ville</router-link> 
        </div>
      </div>
      <div class="col-11 app-view">
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
  font-family: 'Marianne-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body {
  font-size:12.5px;
  font-family: 'Marianne-Regular' !important;
  background-color: #e6eaf5 !important;
  margin:0;
  height: 100%;
}


#nav {
  background: #5473b6;
  padding: 0px;
  display: block;
  height: 100% !important;
  -webkit-box-shadow: 7px 2px 4px -7px rgba(0,0,0,0.56); 
  box-shadow: 7px 2px 4px -7px rgba(0,0,0,0.56);
}

#nav a {
  display: block;
  font-weight: bold;
  color: white;
  padding: 5px 10px 5px 10px;
  text-decoration: none;
}

#nav a:hover {
  background: #305bb6;
}

#nav a.router-link-exact-active {
  background: #3c6cd3;
  border-left: solid 4px #d24b6b !important;
}


.nav-link {
  font-family: 'Marianne-Bold';
  font-size: 1.3em;
}

@import'~bootstrap/dist/css/bootstrap.css'

</style>
