<template>
    <div class="chiffre-cle-wrapper">
        <div class="text"> {{ texte }}</div>
        <div class="chiffre-cle">{{ animatedNumber }}</div>
    </div>
</template>


<script>
import gsap from "gsap";

export default {
    name:'Number',
    props:{
        chiffreCle:Number,
        texte:String
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
        }
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
    padding: 5px;
    padding-left:10px;
    padding-right:10px;
}

.chiffre-cle {
    color:#d24b6b;
    font-size: 19px;
    text-align: left;
    font-family: 'Marianne-Extrabold';
}

.text {
    color:#d24b6b;
    text-align: left;
    font-size:0.9rem;
}

</style>