<template>
  <!-- <body class="d-flex flex-column vh-100"> -->
  <body class="d-flex flex-column ">
    <div class="row g-0 h-100" >
      <div class="col-sm-1">
        <div id="nav" class="nav h-100">
          <router-link to="/">Accueil</router-link> 
          <router-link to="/national">National</router-link> 
          <router-link to="/region">Région</router-link> 
          <router-link to="/departement">Département</router-link> 
          <router-link to="/contrat-de-ville">Contrat de ville</router-link> 
        </div>
      </div>
      <div class="col-md-11">

        <router-view class="container-fluid"/>
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
      this.$store.commit('clearFilter','theme')
      this.$store.commit('clearFilter','cdv')
    },
  },
}
</script>

<style>

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
  /* font-size:0.9em; */
  font-size:12.5px;
  font-family: 'Marianne-Regular' !important;
  background-color: #e6eaf5 !important;
  margin:0;
  height: 100%;
}


#nav {
  background: #5473b6;
  padding: 0px;
  text-align: center;
  display: block;
}

#nav a {
  display: block;
  text-align: center;
  font-weight: bold;
  color: white;
  padding: 5px 10px 5px 10px;
  text-decoration: none;
}

#nav a:hover {
  background: #305bb6;
}

#nav a.router-link-exact-active {
  /* background-color: #d24b6b; */
  background: #3c6cd3;
  border-left: solid 4px #d24b6b !important;
  font-family: 'Marianne-Extrabold';
}


.container-fluid {
  padding:10px;
  display: inline-block;
}

@import'~bootstrap/dist/css/bootstrap.css'

</style>
