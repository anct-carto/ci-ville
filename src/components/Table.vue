<template>
    <div class="table-responsive w-100">
        <!-- <span>Liste des actions dans le contrat de ville</span> -->
        <table class="table" data-toggle="table" data-pagination="true">
            <thead>
                <tr>
                    <th scope="col">Libellé de l'action</th>
                    <th scope="col">Structure porteuse</th>
                    <th scope="col">Objectif</th>
                    <th scope="col">Montant</th>
                </tr>
            </thead>
            <tbody v-if="filterCode || route == 'National'">
                <tr v-for="action in actionsList" :key="action.id_action">
                    <td>{{ action.lib_action }}</td>
                    <td>{{ action.raison_sociale }}</td>
                    <td>{{ action.objectif }}</td>
                    <td class="col-montant">{{ action.montant.toLocaleString()}} €</td>
                </tr>
            </tbody>
            <div class="text-select-territoire" v-else>
                <i>Sélectionnez un territoire pour consulter la liste des actions</i>
            </div>
        </table>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed: {
      ...mapState({
          actionsList: state => state.filteredData,
          filterCode: state => state.filterCode,
        }),
        route() {
            console.log(this.$route.name);
            return this.$route.name
        }
    },
    mounted() {
        // console.log(this.route);
    }
}
</script>

<style>
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
    }
</style>