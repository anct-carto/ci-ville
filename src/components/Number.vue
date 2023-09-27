<template>
    <div class="chiffre-cle-wrapper flex-grow-1" :style="'color:'+color">
        <div class="text flex-grow-1"> {{ texte }}</div>
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
        color:{
            type:String,
            default:'#d24b6b'
        }
    },
    // animation compteur
    data() {
        return {
            tweenedNumber: this.chiffreCle,
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
    }
}
</script>

<style>
.chiffre-cle-wrapper {
    background: white;
    border-radius: 8px;
    border:  1px solid #DADAF0 ;
    padding: 5px 15px 5px 10px;
    margin-top:10px;
    flex-grow: 1;
    flex-direction: row;
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

</style>