<template>
    <div class="row-no-gutter">
        <div style="float:right">
          <label style="display:inline-block; padding-right:5px"><i>Afficher la carte pour l'année</i></label>
          <select class="select" 
                v-model="selected"
                :onchange="onChange">
            <option value="2022" class="value" selected>2022</option>
            <option value="2021" class="value">2021</option>
            <option value="2020" class="value">2020</option>
          </select> 
        </div>
        <img :src="urlCarte[selected]" alt="" srcset="" style="width:100%">
    </div>
</template>

<script>
export default {
    name:'ListCartesStatiques',
    data() {
        return {
            selected:2022,
            urlCarte:{
                "2020":"https://cartotheque.anct.gouv.fr/media/raw/record/eyJpIjoiZGVmYXVsdCIsIm0iOm51bGwsImQiOjEsInIiOjQ3Njd9/",
                "2021":"https://cartotheque.anct.gouv.fr/media/raw/record/eyJpIjoiZGVmYXVsdCIsIm0iOm51bGwsImQiOjEsInIiOjQ3NjR9/",
                "2022":"https://cartotheque.anct.gouv.fr/media/raw/record/eyJpIjoiZGVmYXVsdCIsIm0iOm51bGwsImQiOjEsInIiOjQ4ODN9/",

            },

        }
    },
}
</script>

