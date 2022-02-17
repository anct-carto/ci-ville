<template>
    <div>
        <!-- <span>Liste des actions dans le contrat de ville</span> -->
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Libellé de d'action</th>
                    <th scope="col">Structure</th>
                    <!-- <th scope="col">Thème</th> -->
                </tr>
            </thead>
            <tbody v-if="actionsList">
                <tr v-for="action in actionsList" :key="action.id_action">
                    <td>{{ action.lib_action }}</td>
                    <td>{{ action.raison_sociale }}</td>
                    <!-- <td>{{ action.theme }}</td> -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name:'Table',
    data() {
        return {
            actionsList:''
        }
    },
    computed:{
        actions() {
            return this.$store.state.data
        },
        filterCode() {
            return this.$store.state.filterCode
        },
        filterKey() {
            return this.$store.state.filterKey
        },
    },
    watch: {
        filterCode() {
            this.filterOnCode();
        },
        filterKey() {
            this.filterOnTheme();
        }
    },
    methods: {
        filterOnCode() {
            this.actionsList = this.actions.filter(e => {
                return e.code_cv == this.filterCode
            }).sort((a,b) => {
                if(a.lib_cv<b.lib_cv) return -1
                if(a.lib_cv>b.lib_cv) return 1
                return 0
            });
        },
        filterOnTheme() {
            this.actionsList = this.actions.filter(e => {
                return e.theme == this.filterKey
            }).sort((a,b) => {
                if(a.lib_cv<b.lib_cv) return -1
                if(a.lib_cv>b.lib_cv) return 1
                return 0
            });
        }
    },
}
</script>

<style>
    .table {
        overflow-y:auto;
        display:block;
        height: 235px;
    }

    thead {
        position:sticky; 
        width: 100%;
    }
</style>