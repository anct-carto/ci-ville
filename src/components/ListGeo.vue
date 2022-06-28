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
        <label for="select-territoire">
            Territoire
            <span v-if="route=='Contrat de ville'">
                (trouvez le nom de votre contrat de ville sur <a href="https://sig.ville.gouv.fr/" target="_blank">SIG Ville</a>)
            </span>
        </label>
        <v-select :options="cvList"
                :get-option-label="e => `${e.libgeo} (${e.codgeo})`" 
                :reduce="e => e.codgeo"
                placeholder="Nom, code ..."
                v-model="selected"
                id="select-territoire"
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
            selected:null
        }
    },
    computed:{
        cvList() {
            return this.$store.state.cvList
        },
        route() {
            return this.$route.name
        }
    },
    updated() {
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
    methods: {
        onChange() {
            this.$store.state.filterCode = this.selected;
            this.$store.dispatch('crossFilter', {
                type:'codgeo',
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
        z-index: 50;
    }

    a {
        color:var(--rose-gerr);
        text-decoration: none;
    }

    a:hover {
        color:var(--rose-gerr);
        text-decoration: underline;
    }

</style>