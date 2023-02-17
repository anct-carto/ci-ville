<template>
    <div>
        <label for="select-annee">Année</label>
        <select class="form-select" 
                id="select-annee"
                placeholder="Année"
                v-model="selected"
                :onchange="onChange">
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
        </select>
    </div>
</template>

<script>
export default {
    name:'ListYear',
    data() {
        return {
            selected:'2022'
        }
    },
    methods: {
        onChange() {
            this.$store.dispatch('changeAnnee',this.selected)
        }
    }
}
</script>