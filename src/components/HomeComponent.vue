<template>
  <div class="hello container">
    <img :src="logo_anct" alt="" id="logo-anct"><br><br>
    <!-- <h1>{{ msg }}</h1> -->
    <div class="app-name">
      <h4>
        Panorama interactif des
      </h4>
      <h1>
        ACTIONS FINANCEES
      </h1>
      <h3>par les subventions</h3>
      <h2>
        POLITIQUE DE LA VILLE
      </h2>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam est velit, commodo sit amet felis sit amet, pulvinar pellentesque urna. Curabitur sollicitudin velit nec mauris venenatis consectetur. Aenean non arcu dignissim, tincidunt mi ac, ultrices felis. In vulputate interdum lacus in consectetur. Phasellus eleifend faucibus metus vel imperdiet. Integer pellentesque tortor libero, euismod pellentesque justo elementum id. Nullam malesuada, enim vitae semper blandit, leo erat facilisis ex, ut venenatis velit sapien at turpis. Aliquam a dictum tortor. Suspendisse potenti. Quisque arcu orci, scelerisque sit amet eros id, lacinia pellentesque urna. Praesent lacinia lectus non massa ullamcorper vulputate. Nam rutrum magna vel metus auctor tempor. 
    </p><br>
    <p></p>
    <p>Explorer les actions menées à l'échelle :</p>
    <ul>
      <li> 
        <router-link to="panorama/national" class = "btn ptn-primary">National</router-link>  
      </li>
      <li>
        <router-link to="panorama/region" class = "btn ptn-primary">Région</router-link> 
      </li>
      <li>
        <router-link to="panorama/departement" class = "btn ptn-primary">Département</router-link> 
      </li>
      <li>        
        <router-link to="panorama/contrat-de-ville" class = "btn ptn-primary">Contrat de ville</router-link> 
      </li>
    </ul>
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

.app-name {
  font-family: 'Marianne-Bold';
  color:#d24b6b;
  line-height: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
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
