<template>
  <div class="widget">
      <div class="header">
          {{ title }}
          <span class="circle"
                v-if="about"
                @mousemove="displayTooltip" 
                @mouseout="showTooltip=false">
                ?
          </span>
          <div class="card-tooltip" v-if="showTooltip" 
                id="cardTooltip"
                :style="style">
              {{ about }}
          </div>
      </div>
      <div class="body">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    props: ['title','about'],
    data() {
        return {
            showTooltip:false,
            style:''
        }
    },
    methods: {
        displayTooltip(e) {
            this.showTooltip = true;

            // faire bouger l'étiquette en fonction de la div
            let left = e.clientX;
            let top = e.clientY;
            this.style = {
                left: left-150 + 'px',
                top: top-55 + 'px'
            };
        }
    },
}
</script>

<style>

.widget {
  background: white;
  position: relative;
  box-shadow: 0 2px 2px rgba(0,0,0,.02), 0 0px 2px rgba(0,0,0,.01);
  border-radius: 5px;
  padding:10px;
  margin-bottom:10px;
  margin-top:10px;
  /* border:solid 1px #dfdfdf */
}

.header {
    font-family: 'Marianne-Bold';
    font-size: 1.3em;
    display: flex;
}


.circle {
    margin-left: auto;
    border:solid 2px rgb(187, 187, 187);
    border-radius:15px;
    width: 25px;
    height: 25px;
    vertical-align: middle;
    text-align: center;
    align-items: center;
    font-size:15px;
    cursor:default;
}

.card-tooltip {
    margin-left: auto;
    position:fixed;
    /* background: rgb(252, 252, 252); */
    background: #5473b6;
    color:white;
    box-shadow: 0 2px 2px rgba(0,0,0,.09), 0 0px 2px rgba(0,0,0,.1);
    /* margin-left:350px;*/
	/* margin-top:-10px; */
    z-index: 1000;
    max-width: 300px;
    padding: 5px 10px 5px 10px;
    font-family:'Marianne-Regular';
    font-size:0.7em;
    border-radius: 4px;
}

</style>