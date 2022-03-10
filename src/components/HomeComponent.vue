<template>
  <div class="hello">
    <img :src="logo_anct" alt="" id="logo-anct">
    <h1>{{ msg }}</h1>
    <p>Bienvenue sur le tableau de bord des actions menées dans les quartiers politique de la ville.</p>
    <p>Cette application a pour objectif de présenter sous la forme de chiffres clés, de cartes et de graphiques, un bilan des actions menées
      dans le cadre du programme 147 en 2020 et 2021.
      Pour cela, une entrée territoriale et thématique est proposée.
    </p>
    <p>Explorer les actions menées à l'échelle :</p>
    <ul>
      <li> 
        <router-link to="/national" class = "btn ptn-primary">National</router-link>  
      </li>
      <li>
        <router-link to="/reg-dep" class = "btn ptn-primary">Région/département</router-link> 
      </li>
      <li>        
        <router-link to="/contrat-de-ville" class = "btn ptn-primary">Contrat de ville</router-link> 
      </li>
    </ul>
    <h3>Bonne navigation !</h3>
  </div>
</template>

<script>

import logo_anct from "@/assets/logo_anct.png"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      logo_anct:logo_anct
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  font-family: 'Marianne-Bold';
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  display: block;
}


#logo-anct {
  width:500px;
  height:190px
}

.btn {
  width: 150px;
  margin: 10px 10px;
  background: #d24b6b;
  color:white;
  border-radius:0px
}

.btn:hover {
  opacity: .9;
  color:white
}

</style>
