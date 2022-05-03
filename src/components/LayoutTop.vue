<template class="parent">
    <div class="parent">
        <div class="col-2">
            <ListEchelle/>
        </div>
        <div class="col-2">
            <ListYear/>
        </div>
        <div class="col-3" v-if="this.$route.name != 'National'">
            <ListGeo id="select-territoire" :filterCodeFromStore="filterCode"/>
        </div>
        <div class="col-3 filter-indicator">
            <b>
                Filtres actifs :
            </b><br>
            <div class="filter-info" v-if="filterCode">{{ filterCode }}</div>
            <div class="filter-info" v-if="filterKey">{{ filterKey }}</div>
        </div>
        <div class="col-2 btn-container">
            <button class="btn btn-primary">Partager</button>
            <button class="btn btn-primary">Télécharger</button>
        </div>
    </div>
</template>

<script>
import ListGeo from "@/components/ListGeo.vue";
import ListYear from "@/components/ListYear.vue";
import ListEchelle from "@/components/ListEchelle.vue";

import {mapGetters} from 'vuex'
import {mapState} from 'vuex'


export default {
    name:'LayoutTop',
    components:{
        ListGeo,
        ListYear,
        ListEchelle,
    },
      computed: {
      ...mapGetters(['nbActions','nbStructures','montant']),
      ...mapState(['filteredData','filterCode','filterKey']),
  },
}
</script>

<style>
    .parent {
        display: flex;
        flex: row;
        margin-top:-10px;
        margin-bottom: 10px;
        gap:10px;
    }

    .filter-info {
        background: #d24b6b;
        margin-left: 10px;
        display: inline;  
        color:white;
        padding: 4px !important;
        border-radius: 5px;
        z-index: 100;
    }

    .filter-indicator {
        display: inline-block;

    }

    .form-select {
        padding:10px;
    }

    .vs__dropdown-toggle {
        padding:8px
    }

    .btn-container {
        display: flex;
        gap:10px;
    }

    .btn {
        width:100%;
        text-transform: uppercase;
        background: #d24b6b;
        border:none
    }

    /* div {
        display: flex;
        align-items: flex-start;
        width: 100%;
        vertical-align: middle;
    }

    label {
        flex: 1;
    } */
</style>
