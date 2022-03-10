<template>
  <!-- <body class="d-flex flex-column vh-100"> -->
  <body class="">
    <div id="nav" class="nav">
      <router-link to="/">Accueil</router-link> 
      <router-link to="/national">National</router-link> 
      <router-link to="/reg-dep">Région/département</router-link> 
      <router-link to="/contrat-de-ville">Contrat de ville</router-link> 
    </div>
    <router-view class="container-fluid"/>
  </body>
</template>

<script>
export default {
  watch: {
    $route() {
        this.updateData(this.$route.name)
    }
  },
  methods: {
    updateData(filter) {
      this.$store.commit('getDataByPage',filter)
    }
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
  text-align: center;
  margin: 0;
}

#nav {
  background: #5473b6;
  padding: 0px 0 0px 0;
}

#nav a {
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
  border-bottom: solid 5px #d24b6b !important;
}

html, body {
  font-size:0.8em;
  font-family: 'Marianne-Regular' !important;
  background-color: #eef3ff !important;
}

.container-fluid {
  padding:10px;
}

@import'~bootstrap/dist/css/bootstrap.css'

</style>
