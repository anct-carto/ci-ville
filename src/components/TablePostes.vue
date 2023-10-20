<template>
    <div class="table-container">
        <EasyDataTable 
            class="table"
            id="table-fonjep"
            v-if="filterCode || route == 'National'"
            :headers="headers"
            :items="liste"
            :rowsPerPageMessage="'Nombre de lignes par page'"
            :emptyMessage="'Aucun poste financé'"
            :themeColor="'#5770be'"
        />
        <span class="else-msg" v-else><i>Sélectionnez un territoire pour consulter les postes financés par structure</i></span>
    </div>
</template>

<script>
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import * as _ from "underscore"


import {mapState} from 'vuex'

export default {
    components:{
        EasyDataTable:Vue3EasyDataTable
    },
    data() {
        return {
            headers: [
                { text: "Bénéficiaire", value: "raison_sociale", sortable: true},
                { text: "Contrat", value: "type_poste", sortable: true},
                { text: "Nombre de postes", value: "nb_postes", sortable: true },
            ]
        }
    },
    computed: {
      ...mapState({
          listFonjep: state => state.filteredDataFonjep.sort((a,b) => {
            // tri par ordre alphabétique du nom de porteur
            if(a.raison_sociale<b.raison_sociale) return -1
            if(a.raison_sociale>b.raison_sociale) return 1
            return 0
          }),
          listARelais: state => state.filteredDataAdulteRelais.sort((a,b) => {
            // tri par ordre alphabétique du nom de porteur
            if(a.raison_sociale<b.raison_sociale) return -1
            if(a.raison_sociale>b.raison_sociale) return 1
            return 0
          }),
          filterCode: state => state.filterCode,
        }),
        route() {
            return this.$route.name
        },
        liste() {
            // on compte le nombre de postes financés en distiguant type de poste/contrat (fonjep ou AR)
            const countFonjep = this.countNbPostes(this.listFonjep);
            countFonjep.forEach(e => e.type_poste = "Fonjep");
            const countARelais = this.countNbPostes(this.listARelais);
            countARelais.forEach(e => e.type_poste = "Adulte-relais"); 
            // on fusionne les deux tables
            const total = countFonjep.concat(countARelais);
            return total
        },
    },
    methods:{
        countNbPostes(tableau) {
            let count = _.countBy(tableau,'raison_sociale');
            count = _.map(count,(value,key) => {
                return {
                raison_sociale:key,
                nb_postes:value
                }
            })
            return count
        }
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