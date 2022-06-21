<template>
    <div>
        <label for="select-annee">Échelle géographique</label>
        <select class="form-select" 
                id="select-echelle"
                v-model="selected"
                :onchange="changeRoute">
            <option disabled hidden>{{selected}}</option>
            <option v-for="option in options" :value="option.path" :key="option">
                {{ option.name }}
            </option>
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
                    name:'National',
                    path:'national'
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