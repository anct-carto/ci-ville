<template>
    <div>
        <label for="select-annee">Année</label>
        <select class="form-select" 
                id="select-annee"
                placeholder="Année"
                v-model="selected"
                :onchange="onChange">
            <option v-for="annee in listAnnees" :value="annee" :key="annee">{{ annee }}</option>
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
        ...mapState({
            annee: state => state.annee,
            listAnnees:state => state.listAnnees
        })
    },
    // pour la garder sélectionée dans la liste en changeant de page / changeant d'échelle
    watch: {
        $route() {
            this.selected = this.annee
        }
    },
    methods: {
        onChange() {
            this.$store.dispatch('changeAnnee',this.selected)
        }
    }
}
</script>