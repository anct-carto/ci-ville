<template>
    <div>
        <label for="select-annee">Choisir une année</label>
        <select class="form-select" 
                id="select-annee"
                placeholder="Année"
                v-model="selected"
                :onchange="onChange">
            <option selected value="2020">2020</option>
            <option value="2021">2021</option>
        </select>
    </div>
</template>

<script>
export default {
    name:'ListYear',
    data() {
        return {
            selected:''
        }
    },
    methods: {
        onChange() {
            this.$store.state.year = this.selected;
            // this.$store.commit('crossFilter', {
            //     type:'year',
            //     value:this.selected
            // })
        }
    }
}
</script>