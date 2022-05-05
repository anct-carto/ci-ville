<template>
  <div class="hello container">
    <img :src="logo_anct" alt="" id="logo-anct"><br><br>
    <!-- <h1>{{ msg }}</h1> -->
    <div class="app-name">
      <h3>
        Cartes interactives des actions politique de la ville subventionnées par année
      </h3>
    </div>
    <div class="row">
      <div class="col-6">
        <p>Plusieurs échelles sont proposées :</p>
        <ul>
          <li>
            La carte des actions financées au niveau des contrats de villes
            <router-link to="panorama/contrat-de-ville" class = "btn ptn-primary">Contrat de ville</router-link> 
          </li>
          <li>
            La carte des actions départementales financées à l'échelle du département mais hors des contrats de ville
            <router-link to="panorama/departement" class = "btn ptn-primary">Département</router-link> 
          </li>
          <li>
            La carte des actions régionales financées à l'échelle de la région hors des contrats de ville
            <router-link to="panorama/region" class = "btn ptn-primary">Région</router-link> 
          </li>
          <li>
            La liste des actions ayant été financées au niveau national
            <router-link to="panorama/national" class = "btn ptn-primary">National</router-link>  
          </li>
        </ul>
      </div>
      <div class="col-6">
        <h5>Quelles sont les données représentées ?</h5>
        <p>
          Les données sont issues de XXXXX. Elles représentent le montant financé, les actions déployées ainsi que les tiers concernés. Les postes adultes relais et Fonjep ne sont pas représentés.
        </p>
        <p>
          Les cercles figurant sur les cartes sont dimensionnés en fonction du nombre d’actions financées. Ils permettent de comparer les volumes d'actions par territoire. 
        </p>
        <p>
          La liste des actions financées permet également d'avoir accès au nom et aux porteurs des projets. 
        </p>
        <h5>Comment fonctionne ?</h5>
        <p>
          Les données sont issues de XXXXX. Elles représentent le montant financé, les actions déployées ainsi que les tiers concernés. Les postes adultes relais et Fonjep ne sont pas représentés.
        </p>
        <p>
          Les cercles figurant sur les cartes sont dimensionnés en fonction du nombre d’actions financées. Ils permettent de comparer les volumes d'actions par territoire. 
        </p>
        <p>
          La liste des actions financées permet également d'avoir accès au nom et aux porteurs des projets. 
        </p>
      </div>
    </div>
    <h4>Bonne navigation !</h4>
    <!-- <img :src="bg" alt="" srcset="" class="bg-img"> -->
  </div>
</template>

<script>

import logo_anct from "@/assets/logo_anct.png"
import bg from "@/assets/bg.svg"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      logo_anct:logo_anct,
      bg:bg
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div {
  text-align: center;
}

.app-name {
  font-family: 'Marianne-Bold';
  color:#d24b6b;
  line-height: 1rem;
}

h5 {
  font-family: 'Marianne-Bold';

}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  /* display: block; */
}


#logo-anct {
  width:400px;
}

.bg-img {
  position: absolute;
  width:100%;
  height: auto;
}

.btn {
  /* width: 150px; */
  margin: 10px 10px;
  color: #d24b6b;
  border-radius:0px;
  text-transform: uppercase;
}

.btn:hover {
  opacity: .9;
  font-family: 'Marianne-Bold';
  color:#d24b6b;
  border-bottom:solid 2px #d24b6b
}

.btn:focus {
  outline:#d24b6b;
    box-shadow: none;

}

</style>
