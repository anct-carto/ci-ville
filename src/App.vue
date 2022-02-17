<template>
  <body class="d-flex flex-column vh-100">
    <div id="nav" class="nav">
      <router-link to="/">Accueil</router-link> 
      <router-link to="/national">National</router-link> 
      <router-link to="/reg-dep">Région/département</router-link> 
      <router-link to="/contrat-de-ville">Contrat de ville</router-link> 
    </div>
    <router-view/>    
  </body>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

#nav {
  background: #5473b6;
  padding: 0px 0 0px 0;
  /* background: linear-gradient(to left, #5473b6,#647DB9); */
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
  background-color: #d24b6b;
}

@import'~bootstrap/dist/css/bootstrap.css'
</style>
