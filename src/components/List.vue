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
                label="libgeo" 
                :reduce="e => e.codgeo"
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
    watch: {
        filterCodeFromStore() {
            this.selected = this.filterCodeFromStore
        }
    },
    computed:{
        cvList() {
            return this.$store.state.cvList
            // let sortedArray = this.actions.filter(e => {
            //     return e.code_cv != "HORSCONTVILLE"
            // }).sort((a,b) => {
            //     if(a.lib_cv<b.lib_cv) return -1
            //     if(a.lib_cv>b.lib_cv) return 1
            //     return 0
            // });
            // let uniqueValues = sortedArray.map(e => {
            //     let columns = ['lib_cv','code_cv'];
            //     let key = columns.map(k => e[k]).join('|');
            //     return [key,e]
            // });
            // uniqueValues = new Map(uniqueValues);
            
            // return Array.from(uniqueValues.values())
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