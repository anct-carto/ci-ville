<template>
    <div class="chiffre-cle-wrapper">
        <span class="chiffre-cle"> {{ chiffreCle.toLocaleString() }}</span><br>
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
}
</script>

<style>
.chiffre-cle-wrapper {
    background: white;
    border-radius: 5px;
    text-align: center;
    /* white-space: pre; */
    margin: 10px 0 10px 0;
}

.chiffre-cle {
    color:#d24b6b;
    font-size: 1.7em;
    font-weight: bolder;
}

.text {
    color:#d24b6b;
    font-size:.9em;
}

</style>