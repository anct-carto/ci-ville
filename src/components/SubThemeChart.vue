<template>
      <div>
        <canvas id="subtheme-chart"></canvas>
      </div>
</template>

<script>
import Chart from 'chart.js/auto';
import * as _ from "underscore"
import { mapState } from 'vuex';

export default {
    name:'SubThemeChart',
    data() {
        this.chart = null
        return {

        }
    },
    computed: {
        ...mapState({
            actions: state => state.filteredData,
            filterTheme: state => state.filterKey,
            filterCode: state => state.filterCode,
            themeColor: state => state.themeColor,
        }),
        countPerSubTheme() {
            let count = _.countBy(this.actions,'sous_theme')
            count = _.chain(count)
            .map((value,key) => {
                return {
                    'sous_theme':key,
                    'count':value
                }
            }).sortBy('count')
            .reverse()
            ._wrapped
            return count
        },
        dataset() {
            return this.countPerSubTheme.map(e => e.count );
        },
        labels() {
            console.log("actualisation");
            return this.countPerSubTheme.map(e => e.sous_theme )
        } 
    },
    watch: {
        filterTheme() {
            // !! DEUX méthodes pour mettre à jour le graphique

            // 1ère méthode : supprimer et regénérer le graphique
            // this.chart.destroy()
            // this.createChart()

            // 2e méthode : mettre à jour en injecter les données actualisées
            this.updateChart()
        },
        filterCode() {
            this.updateChart()
        }
    },
    mounted() {
        this.createChart()
    },
    methods: {
        createChart() {
            // let labels = this.countPerSubTheme.map(e => {
            //     return e.sous_theme
            // });
            
            // let dataset = this.countPerSubTheme.map(e => {
            //     return e.count
            // });

            const ctx = document.getElementById('subtheme-chart');
            let chartOptions = {
                type: 'bar',   // le type du graphique
                data:{
                labels: this.labels,
                datasets:[{
                    data:this.dataset,
                    labels:this.labels,
                    backgroundColor:this.themeColor,
                    // backgroundColor: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                    //                 '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
                    //                 '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
                    //                 '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
                    //                 '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
                    //                 '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
                    //                 '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
                    //                 '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
                    //                 '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
                    //                 '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
                    // backgroundColor: this.getbgColors(),
                    hoverOffset: 5,
                }]
                },
                options:{
                    indexAxis:'y',
                    plugins: {
                        legend: {
                            display: false,
                            position:'right',
                            direction:'horizontal',
                            align: "start",  // alignement à gauche 
                            labels:{
                                usePointStyle:true,
                            },
                            onClick: null, // désactive le filtre au clic sur un item de légende
                        },
                        title: {
                            display:false,
                            text:'coucou',
                            options: {
                            fullSize:false
                            }
                        },
                        tooltip: {
                            position: 'nearest',
                            titleFont:{
                                family:'Marianne-Regular',
                                weight:'regular'
                            },
                            bodyFont:{
                                family:'Marianne-Regular'
                            },
                        }
                    },
                    layout: {
                        padding:20
                    },
                    scales: {
                        x: {
                            grid: {
                                display:true
                            },
                            ticks:{
                                display:true,
                                font: {
                                    family: 'Marianne-Regular'
                                }
                            }
                        },
                        y: {
                            grid: {
                                display:false
                            },
                            ticks: {
                                precision:0,
                                font: {
                                    family: 'Marianne-Regular'
                                }
                            }
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 1, 
                }
            };
            
            // initialisation sur la page
            let chart = new Chart(ctx, chartOptions);
            this.chart = chart;
        },
        updateChart() {
            // actualise les valeurs : dataset(valeurs), labels (nom des valeurs), couleur
            this.chart.data.labels = this.labels;
            this.chart.data.datasets[0].data = this.dataset;
            this.chart.data.datasets[0].backgroundColor = this.themeColor;

            this.chart.update()
        }

    },

}
</script>

<style scoped>   
    div {
        width: 100%;
        background-color: white;
        padding:1px;
    }

</style>


