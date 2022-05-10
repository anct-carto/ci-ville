<template>
  <div class="hello">
    <img :src="logo_anct" alt="" id="logo-anct"><br><br>
    <!-- <h1>{{ msg }}</h1> -->
    <b style="color:red">! Pages en cours de développement !</b><br>
    <span>Bienvenue sur les</span>
    <div class="app-name">
        Cartes interactives<br> des actions politique de la ville<br>subventionnées par année
    </div>
    <div class="row">
      <div class="col-4">
        <p>
          Cette application présente, à l'aide d'une carte et de graphiques filtrables, la répartition et la liste des actions menées dans les quartiers prioritaires de la politique de la ville et financées par le programme 147.
        </p>
        <p>
          La répartition des actions est présentée en fonction :
          <ul>
            <li>
              - de l'échelon territorial bénéficiaire : du contrat de ville au national ;
            </li>
            <li>
              - de l'année de financement : 2020 ou 2021 ;
            </li>
            <li>
              - de la thématique portée : piliers de la pilitique de la ville et sous-thèmes
            </li>
          </ul>
        </p>
        <div class="row btns">
          <div class="col-6">
            <router-link :to="{name:'Panorama',path:'panorama',params:{echelle:'contrat-de-ville'}}" class = "btn btn-primary btn-principal">-> Démarrage rapide</router-link> 
            <!-- <button class="btn btn-primary btn-principal">
              Démarrage rapide
            </button> -->
          </div>
          <div class="col-6">
            <router-link to="a-propos" class = "btn btn-primary btn-principal">-> En savoir plus</router-link> 
            <!-- <button class="btn btn-primary btn-principal">En savoir plus</button>             -->
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p>ou explorer les actions à l'échelle : </p>
            <ul>
              <li>
                <router-link :to="{name:'Panorama',path:'panorama',params:{echelle:'contrat-de-ville'}}" class = "btn-shortcut">Contrat de ville</router-link> 
              </li>
              <li>
                <router-link :to="{name:'Panorama',path:'panorama',params:{echelle:'departement'}}" class = "btn-shortcut">Département</router-link> 
              </li>
              <li>
                <router-link :to="{name:'Panorama',path:'panorama',params:{echelle:'region'}}" class = "btn-shortcut">Région</router-link> 
              </li>
              <li>
                <router-link :to="{name:'Panorama',path:'panorama',params:{echelle:'national'}}" class = "btn-shortcut">National</router-link>  
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
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

.hello {
  padding-left:50px;
}

.app-name {
  font-family: 'Marianne-Bold';
  color:rgb(41, 49, 115);
  text-transform: uppercase;
  font-size:2.5em;
  margin-bottom: 30px;
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
  width:200px;
}

.bg-img {
  position: absolute;
  width:100%;
  height: auto;
}

.btn-principal {
  font-size: 1.3em;
  border-radius: 20px;
  text-transform: uppercase;
  width: 100%;
  /* display: inline-block;
  width: 50%; */
  background: #d24b6b;
  border: solid 2px #d24b6b;
  font-family: 'Marianne-Bold';
}

.btn-principal:hover {
  background: none;
  border: solid 2px #d24b6b;
  color: #d24b6b;
}

.btns {
  margin-top:40px;
  margin-bottom:20px
}

.btn-shortcut  {
  text-transform: uppercase;
  color: var(--rose-gerr); 
  margin: 5px 10px 2px 10px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  /* transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out !important; */
  letter-spacing: 1px;
}

.btn-shortcut::after {
  content: "";
  display:block;
  margin:0 auto;
  margin-bottom: -2px;
  height: 2px;
  background-color: var(--rose-gerr);
  visibility: hidden;
  z-index: 1000;
  transform: scaleX(0);  
  transition: transform 250ms ease-in-out;
}

.btn-shortcut:hover:after {
  visibility: visible;
  transform: scaleX(1);
}

</style>
