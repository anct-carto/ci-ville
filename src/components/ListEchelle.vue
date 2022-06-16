<template>
    <div>
        <label for="select-annee">Échelle géographique</label>
        <select class="form-select" 
                id="select-echelle"
                v-model="selected"
                :onchange="changeRoute">
            <option disabled>{{selected}}</option>
            <option v-for="option in options" :value="option.path" :key="option">
                {{ option.name }}
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
    name:'ListEchelle',
    data() {
        return {
            selected:this.route,
            options:[
                {
                    name:'Global',
                    path:'global'
                },
                {
                    name:'Région',
                    path:'region'
                },
                {
                    name:'Département',
                    path:'departement'
                },
                {
                    name:'Contrat de ville',
                    path:'contrat-de-ville'
                },
            ],
        }
    },
    computed: {
        route() {
            return this.$route.name
        }
    },
    created() {
        this.selected = this.route
    },
    methods: {
        changeRoute() {
            this.$router.push({path:this.selected})
        }
    }
}
</script>