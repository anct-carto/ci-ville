<template>
    <div class="chiffre-cle-wrapper flex-grow-1" :style="'color:'+color">
        <div class="text flex-grow-1"> 
            {{ texte }} 
            <span class="circle"
                    v-if="about"
                    @mousemove="displayTooltip" 
                    @mouseout="showTooltip=false">
                    ?
            </span>
        </div>
        <div class="card-tooltip" v-if="showTooltip" 
                    id="cardTooltip"
                    :style="style">
                {{ about }}
        </div>
        <div class="chiffre-cle flex-grow-1">{{ animatedNumber }}</div>
    </div>
</template>


<script>
import gsap from "gsap";

export default {
    name:'Number',
    props:{
        chiffreCle:Number,
        texte:String,
        about:String,
        color:{
            type:String,
            default:'#d24b6b'
        }
    },
    // animation compteur
    data() {
        return {
            tweenedNumber: this.chiffreCle,
            showTooltip:false,
        }
    },
    computed: {
        animatedNumber() {
            if(this.chiffreCle>1000000) {
                return (this.tweenedNumber/1000000).toLocaleString("fr-FR", {maximumFractionDigits: 2}) + " M"
            } else {
                return (this.tweenedNumber).toLocaleString("fr-FR", { maximumFractionDigits: 0})
            }
        },
    },
    watch: {
        chiffreCle(newVal) {
            gsap.to(this.$data, {duration: 0.5, tweenedNumber:newVal})
        }
    },
    methods: {
        displayTooltip(e) {
            this.showTooltip = true;

            // faire bouger l'étiquette en fonction de la div
            let left = e.clientX;
            let top = e.clientY;
            this.style = {
                left: left+5 + 'px',
                top: top-50 + 'px'
            };
        }
    },
}
</script>

<style scoped>
.chiffre-cle-wrapper {
    background: white;
    border-radius: 8px;
    border:  1px solid #DADAF0 ;
    padding: 5px 15px 5px 10px;
    margin-top:10px;
    flex-grow: 1;
    flex-direction: row;
    color:#d24b6b
}

.chiffre-cle {
    font-size: 1.2vw;
    text-align: right;
    font-family: 'Marianne-Extrabold';
}

.text {
    text-align: center;
    font-size:0.7vw;
}

.body > div {
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    bottom: 0;
}

.circle {
    margin-left: auto;
    border:solid 1px #d24b6b;
    border-radius:10px !important;
    padding-left:4px;
    padding-right:4px;
    font-size: 10px;
    vertical-align: middle;
    text-align: center;
    align-items: center;
    cursor:default;
}

.card-tooltip {
    margin-left: auto;
    position:fixed;
    background: rgba(0,0,0,.8);
    color:white;
    box-shadow: 0 2px 2px rgba(0,0,0,.09), 0 0px 2px rgba(0,0,0,.1);
    max-width:450px;
    z-index: 500;
    padding: 5px 10px 5px 10px;
    font-family:'Marianne-Regular';
    font-size:10px;
    border-radius: 4px;
}


</style>