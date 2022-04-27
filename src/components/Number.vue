<template>
    <div class="chiffre-cle-wrapper">
        <span class="chiffre-cle"> 
            {{ animatedNumber }}
        </span><br>
        <span class="text"> {{ texte }}</span>
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
            // this.tweenedNumber = this.tweenedNumber.toFixed(0);
            if(this.chiffreCle>1000000) {
                return (this.tweenedNumber/1000000).toLocaleString("fr-FR", {maximumFractionDigits: 2}) + "M"
            } else {
                return (this.tweenedNumber).toLocaleString("fr-FR", { maximumFractionDigits: 0})
            }
            // return this.tweenedNumber.toFixed(0)
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
    border-radius: 5px;
    text-align: center;
    /* white-space: pre; */
    margin: 15px 0 8px 0;
    padding: 5px;
}

.chiffre-cle {
    color:#d24b6b;
    font-size: 1.6em;
    font-family: 'Marianne-Extrabold';
}

.text {
    color:#d24b6b;
    font-size:.9em;
}

</style>