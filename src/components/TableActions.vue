<template>
    <div class="table-container">
        <EasyDataTable 
            class="table"
            id="table-actions"
            v-if="filterCode || route == 'National'"
            :headers="headers"
            :items="actionsList"
            :rowsPerPageMessage="'Nombre de lignes par page'"
            :themeColor="'#5770be'"
            :key="renderKey"
        />
        <span class="else-msg" v-else><i>Sélectionnez un territoire pour consulter la liste des actions</i></span>
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
            renderKey:0,
            headers: [
                { text: "Libellé de l'action", value: "lib_action", sortable: true },
                { text: "Porteur", value: "raison_sociale", sortable: true},
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
    watch:{
        actionsList() {
            this.reRender(); // rafraichir la table pour la faire retourner à la première page des résultats (sinon bug)
        }
    },
    methods:{
        reRender() {
            this.renderKey++
        },
    }
}
</script>

<style>
    .table-container {
        display: block;
        height:calc(100vh - 150px) !important;
        background: white;
        text-align: center;
        align-items: center;
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

    .else-msg {
        flex-direction: column;
        text-align: center;
        vertical-align: middle;
    }
</style>