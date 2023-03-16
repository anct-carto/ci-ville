<template>
    <div>
        <label for="select-annee">Échelle</label>
        <select class="form-select" 
                id="select-echelle"
                v-model="selected"
                :onchange="changeRoute">
            <option v-for="option in options" :value="option.name" :key="option">
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
            selected:this.$route.name,    
        }
    },
    computed: {
        options() {
            const routes = this.$router.getRoutes()
            let options = routes.filter(e => e.path.search("panorama/") == true)
            return options
        }
    },
    methods: {
        changeRoute() {
            const path = this.options.find(e => e.name == this.selected).path;
            this.$router.push({path:path});
        }
    }
}
</script>