<template>
  <body class="container-fluid d-flex flex-column">
    <!-- ajouter g-0 (gutters=0) permet de ne pas avoir d'ascenseur en horizontal -->
    <div class="row w-100 g-0"> 
        <div id="nav" class="nav">
          <router-link to="/">Accueil</router-link> 
          <router-link to="/panorama">Visualisation</router-link> 
          <router-link to="/a-propos">À propos</router-link> 
        </div>
      <div class="row app-view">
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
	--font-size-global:1.1em;
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
  font-size:11px;
  font-family: 'Marianne-Regular', Arial, Helvetica, sans-serif !important;
  background-color: #e6eaf5 !important;
  margin:0;
  height: 100%;
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
  color: var(--rose-gerr); 
}

#nav a  {
  text-transform: uppercase;
  color: var(--rose-gerr); 
  margin: 5px 10px 2px 10px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  /* transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out !important; */
  letter-spacing: 1px;
}

  /*Hover effect underline*/
#nav a::after {
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
}

#nav a.router-link-active {
  font-family: 'Marianne-Bold';
  border-bottom: solid 3px var(--rose-gerr);
  border-bottom-width: 50% !important;
}

.nav-link {
  font-family: 'Marianne-Bold';
  font-size: 1.2em !important;
}

select,option {
  cursor:pointer
}

@import'~bootstrap/dist/css/bootstrap.css'

</style>
