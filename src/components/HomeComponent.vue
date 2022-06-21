<template>
  <div class="hello">
    <img :src="logo_anct" alt="" id="logo-anct"><br><br>
    <!-- <h1>{{ msg }}</h1> -->
    <b style="color:red">! Site web en cours de développement !</b><br>
    <div class="app-name">
        Cartes interactives<br> des actions politique de la ville<br>subventionnées par année
    </div>
    <div class="row">
      <div class="col-4">
        <p>
          Cet outil de datavisualisation présente une répartition multi-échelle et pluri-thématique des crédits alloués aux actions subventionnées dans les quartiers de la politique de la ville.
        </p>
        <div class="row btns">
          <div class="row btns">
            <div class="col-6">
              <router-link :to="{name:'Panorama',path:'panorama',params:{echelle:'contrat-de-ville'}}" class = "btn btn-primary btn-principal">Accéder aux cartes</router-link> 
            </div>
            <div class="col-6">
              <router-link to="a-propos" class = "btn btn-primary btn-principal">En savoir plus</router-link> 
            </div>
          </div>
        </div>
        <p>
          Quatre échelles géographiques sont fléchées :
          <ul>
            <li>
              le national : les valeurs agrègent tous les crédits affectés, qu'ils soient en contrat de ville ou hors contrat de ville. 
            </li>
            <li>
              le régional : les valeurs agrègent les crédits affectés aux contrats de ville de la région, ainsi que les crédits hors contrat de ville. 
            </li>
            <li>
              le départemental : les valeurs agrègent les crédits affectés aux contrats de ville du département, ainsi que les crédits hors contrat de ville. 
            </li>
            <li>
              Le contrat de ville : sont exclus de cette vue les crédits fléchés sur plusieurs contrats de ville, qu'ils soient instruits par le niveau national, régional ou départemental
            </li>
          </ul>
        </p>
        <!-- <div class="row">
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
        </div> -->
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
  padding-left:25px;
}

.app-name {
  font-family: 'Marianne-Bold';
  color:rgb(41, 49, 115);
  text-transform: uppercase;
  font-size:2.5em;
  margin-bottom: 30px;
}

li {
   list-style: square !important;
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
  margin-top:10px;
  margin-bottom:10px
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
}

</style>
