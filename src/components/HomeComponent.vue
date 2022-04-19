<template>
  <div class="hello container">
    <img :src="logo_anct" alt="" id="logo-anct">
    <!-- <h1>{{ msg }}</h1> -->
    <div class="app-name">
      <h1>
        Panorama des actions financées
      </h1>
      <h3>par les subventions politique de la ville</h3>
    </div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam est velit, commodo sit amet felis sit amet, pulvinar pellentesque urna. Curabitur sollicitudin velit nec mauris venenatis consectetur. Aenean non arcu dignissim, tincidunt mi ac, ultrices felis. In vulputate interdum lacus in consectetur. Phasellus eleifend faucibus metus vel imperdiet. Integer pellentesque tortor libero, euismod pellentesque justo elementum id. Nullam malesuada, enim vitae semper blandit, leo erat facilisis ex, ut venenatis velit sapien at turpis. Aliquam a dictum tortor. Suspendisse potenti. Quisque arcu orci, scelerisque sit amet eros id, lacinia pellentesque urna. Praesent lacinia lectus non massa ullamcorper vulputate. Nam rutrum magna vel metus auctor tempor. 
    </p><br>
    <p>Explorer les actions menées à l'échelle :</p>
    <ul>
      <li> 
        <router-link to="/national" class = "btn ptn-primary">National</router-link>  
      </li>
      <li>
        <router-link to="/region" class = "btn ptn-primary">Région</router-link> 
      </li>
      <li>
        <router-link to="/departement" class = "btn ptn-primary">Département</router-link> 
      </li>
      <li>        
        <router-link to="/contrat-de-ville" class = "btn ptn-primary">Contrat de ville</router-link> 
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
  width:500px;
  height:190px
}

.bg-img {
  position: absolute;
  width:100%;
  height: auto;
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
