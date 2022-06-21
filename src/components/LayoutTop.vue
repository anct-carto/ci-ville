<template class="parent">
    <div class="row parent">
        <div class="col-2">
            <ListEchelle/>
        </div>
        <div class="col-1">
            <ListYear/>
        </div>
        <div class="col-4" v-if="this.$route.name != 'National' && this.$route.name != 'Global'">
            <ListGeo id="select-territoire" :filterCodeFromStore="filterCode"/>
        </div>
        <!-- <div class="col-4 filter-indicator" v-if="filterTheme||filterCode">
            Filtres actifs :<br>
            <span class="filter-info" v-if="filterTheme">{{ filterTheme }}</span>
            <span class="filter-info" v-if="filterCode">{{ filterCode }}</span>
        </div> -->
        <!-- <div class="col-2 btn-container">
            <button class="btn btn-primary">Partager</button>
            <button class="btn btn-primary">Télécharger</button>
        </div> -->
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
      ...mapState(['filteredData','filterCode','filterTheme']),
  },
}
</script>

<style scoped>
    .parent {
        display: flex;
        flex: row;
        margin-bottom: 10px;
    }

    .filter-indicator {
        display: inline-block;
    }

    .filter-info {
        background: #d24b6b;
        margin-top: 5px;
        margin-right: 5px;
        display: inline;  
        color:white;
        padding: 4px !important;
        border-radius: 5px;
        z-index: 100;
    }

    .form-select {
        padding:8px;
    }

    .vs__dropdown-toggle {
        padding:5px
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
</style>
