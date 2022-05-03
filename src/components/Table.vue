<template>
    <div class="table-responsive w-100">
        <!-- <span>Liste des actions dans le contrat de ville</span> -->
        <table class="table" data-toggle="table" data-pagination="true">
            <thead>
                <tr>
                    <th scope="col">Libellé de l'action</th>
                    <th scope="col">Structure porteuse</th>
                    <th scope="col">Objectif</th>
                    <th scope="col">Montant en euros</th>
                </tr>
            </thead>
            <tbody v-if="actionsList">
                <tr v-for="action in actionsList" :key="action.id_action">
                    <td>{{ action.lib_action }}</td>
                    <td>{{ action.raison_sociale }}</td>
                    <td>{{ action.objectif }}</td>
                    <td>{{ action.montant.toLocaleString()}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed: {
      ...mapState({
          actionsList: state => state.filteredData
        }),
    },
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
        padding-right:10px
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
</style>