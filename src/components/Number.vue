<template>
    <div class="chiffre-cle-wrapper">
        <span class="chiffre-cle"> 
            {{ chiffreCle.toLocaleString("fr-FR") }}
        </span><br>
        <span class="text"> {{ texte }}</span>
    </div>
</template>


<script>
export default {
    name:'Number',
    props:{
        chiffreCle:Number,
        texte:String
    },
    // animation compteur
    // data() {
    //     return {
    //         number:0,
    //         interval:0
    //     }
    // },
    // watch:{
    //     chiffreCle() {
    //         setTimeout(() => {
    //             this.interval = setInterval(() => {
    //                 this.number+=1000;
    //                 if(this.number>=this.chiffreCle) {
    //                     clearInterval(this.interval)
    //                 }
    //             },1)
    //         }, 1);
    //     }
    // }
}
</script>

<style>
.chiffre-cle-wrapper {
    background: white;
    border-radius: 5px;
    text-align: center;
    /* white-space: pre; */
    margin: 15px 0 8px 0;
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