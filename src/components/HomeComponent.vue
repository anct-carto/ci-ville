<template>
  <div class="hello">
    <div class="header-container">
      <img :src="logo_anct" id="logo-anct">
      <br>
      <p class="bienvenue">Bienvenue sur</p>
      <span class="app-name">
        Ci-VILLE
      </span><br>
      <i>
        Cartes interactives de la politique de la ville
      </i>
    </div>
    <div class="row">
      <div class="col-4">
        <p>
          Cet outil permet de visualiser la répartition géographique et thématique des subventions de l'État aux actions en faveur des habitants des quartiers prioritaires de la politique de la ville.
        </p>
        <div class="row btns">
          <div class="row btns">
            <div class="col-6">
              <router-link :to="{name:'Panorama',path:'panorama',params:{echelle:'contrat-de-ville'}}" class = "btn btn-primary btn-principal">Accès aux cartes</router-link> 
            </div>
            <div class="col-6">
              <router-link to="a-propos" class = "btn btn-primary btn-principal">En savoir plus</router-link> 
            </div>
          </div>
        </div>
        <p>
          Quatre échelles géographiques sont proposées :
          <ul>
            <li>
              nationale : les valeurs représentent les subventions d'actions à dimension nationale ;
            </li>
            <li>
              régionale : les valeurs agrègent les crédits affectés aux contrats de ville d'une région, ainsi que les crédits hors contrat de ville ;
            </li>
            <li>
              départementale : les valeurs agrègent les crédits affectés aux contrats de ville du département, ainsi que les crédits hors contrat de ville ;
            </li>
            <li>
              échelle du contrat de ville : les valeurs agrègent les crédits affectés à un contrat de ville.
            </li>
          </ul>
        </p>
      </div>
    </div>
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
      logo_anct:logo_anct,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.bg-img {
  position: absolute;
  width:100%;
  height: auto;
}


.hello {
  padding-left:25px;
}

.header-container {
  margin-bottom: 10px;
  color:#3b5fa9
}

#logo-anct {
  width:200px;
  margin-bottom: 10px;
}

.bienvenue {
  margin-bottom: 5px;
}

.app-name {
  font-family: 'Marianne-Bold';
  background-color: #3b5fa9;
  letter-spacing: 0.25em;
  padding: 5px;
  color:white;
  font-size:3.35em;
}

li {
   list-style: square !important;
}

.btns {
  margin-top:7x;
  margin-bottom:7px
}


.btn-principal {
  font-size: 1.2em;
  border-radius: 20px;
  text-transform: uppercase;
  width: 100%;
  background: #d24b6b;
  border: solid 1px #d24b6b;
  font-family: 'Marianne-Bold';
}

.btn-principal:hover {
  background: none;
  border: solid 1px #d24b6b;
  color: #d24b6b;
}


.btn-shortcut  {
  text-transform: uppercase;
  color: var(--rose-gerr); 
  margin: 5px 10px 2px 10px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
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
