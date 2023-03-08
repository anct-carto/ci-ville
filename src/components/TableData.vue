<template>
    <div class="table-container">
        <EasyDataTable 
            class="table"
            id="table-actions"
            :headers="headers"
            :items="actionsList"
            :rowsPerPageMessage="'Nombre de lignes par page'"
            :themeColor="'#5770be'"
        />
        <!-- <span v-else>Sélectionnez un territoire</span> -->
    </div>
</template>

<script>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import {mapState} from 'vuex'

export default {
    components:{
        EasyDataTable:Vue3EasyDataTable
    },
    data() {
        return {
            headers: [
                { text: "Description de l'action", value: "lib_action", sortable: true },
                { text: "Structu", value: "raison_sociale", sortable: true},
                { text: "Objectif", value: "objectif", sortable: true },
                { text: "Montant (€)", value: "montant", sortable: true },
            ]
        }
    },
    computed: {
      ...mapState({
          actionsList: state => state.filteredData.sort((a,b) => {
            // tri par ordre alphabétique du nom de porteur
            if(a.raison_sociale<b.raison_sociale) return -1
            if(a.raison_sociale>b.raison_sociale) return 1
            return 0
          }),
          filterCode: state => state.filterCode,
        }),
        route() {
            return this.$route.name
        }
    },
    mounted() {
        // document.body.innerHTML = document.body.innerHTML.replace('rows','yaya')
    }
}
</script>

<style>
    .table-container {
        height:calc(100vh - 150px) !important;
        background: white;
        text-align: center;
        vertical-align: middle;
    }

    .table {
        overflow-y:auto;
        display:inline-block;
        width: 100%;
        height:calc(100vh - 150px) !important;
        background: white;
        border-radius: 4px;
        text-align: left;
        padding-left:10px;
        padding-right:10px;
        margin-bottom:0px;
        --easy-table-body-item-padding: 5px 10px;
        --easy-table-header-font-size: 10px;
    }

    thead {
        top:0;
        position:sticky; 
        width: 100%;
        background-color: white !important;
        border-bottom:solid 2px black !important;
    }

    tbody > tr:hover {
        background: rgb(245,245,245);
    }

    .text-select-territoire {
        text-align: center;
        /* margin-top:50%; */
        vertical-align: center;
    }

    .col-montant {
        text-align: right;
        min-width: 100px;
    }
</style>