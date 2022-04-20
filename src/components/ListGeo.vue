<template>
    <div>
        <!-- <select class="form-select" 
                id="select-geo"
                autocomplete="off"
                v-model = "selected"
                placeholder="Sélectionnez un territoire"
                :onchange="onChange">
            <option v-for="cv in cvList" :value="cv.codgeo" :key="cv.codgeo"> 
                {{ cv.libgeo}} ({{ cv.codgeo }})
            </option>
        </select> -->
        <v-select :options="cvList"
                :get-option-label="e => `${e.libgeo} (${e.codgeo})`" 
                :reduce="e => e.codgeo"
                placeholder="Nom, code ..."
                v-model="selected"
                class="select-input"/>
    </div>
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
// https://codepen.io/anon/pen/PgyLXz

export default {
    name:'List',
    props:['filterCodeFromStore'],
    components:{
        'v-select':vSelect,
    },
    data() {
        return {
            selected:''
        }
    },
    updated() {
         console.log(this.selected);
         if(this.selected) {
             this.onChange()
         } else {
            this.$store.dispatch('resetCodegeo')
         }
    },
    mounted() {
        this.selected = ''
    },
    watch: {
        filterCodeFromStore() {
            this.selected = this.filterCodeFromStore
        }
    },
    computed:{
        cvList() {
            return this.$store.state.cvList
        }
    },
    methods: {
        onChange() {
            this.$store.state.filterCode = this.selected;
            this.$store.commit('crossFilter', {
                type:'cdv',
                value:this.selected
            })
        }
    }
}
</script>

<style scoped>
    /* select {
        display: block;
    } */

    .select-input {
        background: white;
    }
</style>