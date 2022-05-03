<template>
    <div>
        <label for="select-annee">Echelle</label>
        <select class="form-select" 
                id="select-echelle"
                placeholder="Echelle"
                v-model="selected"
                :onchange="onChange">
            <option v-for="option in options" :value="option" :key="option">
                {{ option }}
            </option>
            <!-- <option value="national">Hors contrat de ville - ensemble QPV</option>
            <option value="region">Hors contrat de ville - tous les QPV d'une région</option>
            <option value="departement">Hors contrat de ville - tous les QPV d'un département</option>
            <option selected value="contrat-de-ville">En contrat de ville</option> -->
        </select>
    </div>
</template>

<script>
export default {
    name:'ListYear',
    data() {
        return {
            selected:null,
            options:['national','region','departement','contrat-de-ville']
        }
    },
    created() {
        this.select = this.$route.name
    },
    watch: {
        $route() {
        if(this.currentRoute | this.currentRoute != this.$route.name) {
            // this.updateData(this.$route.name)
        }
        this.currentRoute = this.$route.name;
        }
    },
    methods: {
        onChange() {
            this.$store.commit('getDataByPage',this.selected)
            this.$router.push({path:this.selected})
        }
    }
}
</script>