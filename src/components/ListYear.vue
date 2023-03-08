<template>
    <div>
        <label for="select-annee">Année</label>
        <select class="form-select" 
                id="select-annee"
                placeholder="Année"
                v-model="selected"
                :onchange="onChange">
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
        </select>
    </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
    name:'ListYear',
    data() {
        return {
            selected:null
        }
    },
    computed: {
        // récupère l'année du store ...
        ...mapState({annee: state => state.annee})
    },
    mounted() {
        this.selected = this.annee // pour la garder sélectionée dans la liste en changeant de page / changeant d'échelle
    },
    methods: {
        onChange() {
            this.$store.dispatch('changeAnnee',this.selected)
        }
    }
}
</script>