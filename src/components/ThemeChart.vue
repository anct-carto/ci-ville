<template>
      <div>
        <canvas id="theme-chart"></canvas>
      </div>
</template>

<script>

import Chart from 'chart.js/auto';
import * as _ from "underscore"
import {mapState} from 'vuex'

Chart.defaults.font.size = 10.5;

export default {
  name: 'ThemeChart',
  data() {
    this.chart = null
    return {
      selected:null,
      colors:['#3b5fa9','#009f79','#293173','#ff9b4f']
    }
  },
  computed: {
    ...mapState({
      actions: state => state.data,
      filterCode: state => state.filterCode,
      annee: state => state.annee,
      filteredData: state => state.filteredData
    }),
    actionsCount() {
      let actionsCount;
      if(this.filterCode || this.annee) {
        let filteredData = this.actions.filter(e => {
          if(this.filterCode) {
            return e.codgeo === this.filterCode
          } else if(this.annee) {
            return e.annee == this.annee
          }
        });
        actionsCount = this.transformData(filteredData);        
      } else {
        actionsCount = this.transformData(this.actions)
      }
      return actionsCount
    },
    labels() {
      return this.actionsCount.map(e => e.theme)
    },
    dataset() {
      return this.actionsCount.map(e => e.count)
    },
  },
  watch: {
    filterCode() {
      this.updateChart()
    },
    annee() {
      this.updateChart()
    }
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = document.getElementById('theme-chart');

      let chartOptions = {
        type: 'doughnut',   // le type du graphique
        data:{
          labels: this.labels,
          datasets:[{
            label:'actionsCount',
            data:this.dataset,
            labels:this.labels,
            backgroundColor: this.colors,
            hoverOffset: 5,
            hoverBorderColor:'red',
            hoverBorderWidth:3,
          }]
        },
        options:{
          onClick:(evt,el,chart) => {
            // 1. récupérer les nouvellles modalités ...
            let point = chart.getElementsAtEventForMode(evt, 'point', { intersect: true}, true);
            if(point.length) {
              let themeSelected = chart.data.datasets[point[0].datasetIndex].labels[point[0].index]; // récupère le nom du segment sélectionné
              let color = this.getColor(themeSelected); // récupère la couleur correspondante

              // 2. ... à transmettre au store
              // 2.1 ...si thème sélectionné est nouveau ou est différent du précédent sélectionné
              if(themeSelected != this.selected) {
                // enregistre le nom du theme sélectionné pour l'utiliser dans la fonction updateChart()
                this.selected = themeSelected;

                // filtre la variable filteredData dans le store
                this.$store.dispatch('crossFilter',{type:'theme',value:themeSelected}); // filtrage de tout le jeu de données sur le thème
                this.$store.dispatch('updateThemeColor',color); // thème sélectionné à appliquer à la carte
              }

              // actualise le graphique
              this.updateChart()
            } else {
              // 2.2 .. sinon efface le filtre thème appliqué
              // efface la variable
              this.selected = null;

              this.$store.dispatch('resetTheme');

              // actualise le graphique en remettant les segements et couleurs d'origine
              this.updateChart()
            }
          },
          onHover:(evt,activeElem) => {
            // 3. surligne  l'élément cliqué
            activeElem.length > 0 ? evt.chart.canvas.style.cursor = 'pointer' : evt.chart.canvas.style.cursor = 'default';
          },
          animation: {
            duration:1500
          },
          plugins: {
              legend: {
                  display: true,
                  position:'top',
                  direction:'vertical',
                  // align: "start",  // alignement à gauche 
                  labels:{
                    usePointStyle:true,
                    font:{
                      family:'Marianne-Regular'
                    }
                  },
                  onClick:(evt,el) => {
                    let themeSelected = el.text;
                    let color = this.getColor(themeSelected); // récupère la couleur correspondante

                    // 2. ... à transmettre au store
                    // 2.1 ...si thème sélectionné est nouveau ou est différent du précédent sélectionné
                    if(themeSelected != this.selected) {
                      // enregistre le nom du theme sélectionné pour l'utiliser dans la fonction updateChart()
                      this.selected = themeSelected;

                      // filtre la variable filteredData dans le store
                      this.$store.dispatch('crossFilter',{type:'theme',value:themeSelected}); // filtrage de tout le jeu de données sur le thème
                      this.$store.dispatch('updateThemeColor',color); // thème sélectionné à appliquer à la carte
                    }

                    // actualise le graphique
                    this.updateChart()
                  },
                  onHover:(evt) => {
                    evt.native.target.style.cursor = 'pointer';
                  },
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
                bodyFont:{
                  family:'Marianne-Regular'
                },
                // formattage texte tooltip
                callbacks: {
                  label: tooltip => {
                    return `${tooltip.label} : ${tooltip.parsed.toLocaleString("fr-FR")} €`
                  }
                }
              }
          },
          layout: {
            padding:5
          },
          responsive:true,
          maintainAspectRatio:false,
          aspectRatio: 1, 
        }
      };
      
      // initialisation sur la page
      const chart = new Chart(ctx, chartOptions);
      this.chart = chart;
    },
    updateChart() {
      const chartData = this.chart.data;
      // mise à jour des items et des valeurs par items

      // 1. légende
      chartData.labels = this.labels; 
      
      // 2. données
      chartData.datasets[0].data = this.dataset;
      chartData.datasets[0].labels = this.labels;
      
      // mise à jour des couleurs en fonction des items présents
      chartData.datasets[0].backgroundColor = [];
      const newColors = chartData.datasets[0].backgroundColor

      this.labels.forEach(theme => {
        if(this.selected) {
          if(theme == this.selected) {
            newColors.push(this.getColor(theme))
          } else {
            newColors.push('lightgrey')
          }
        } else {
          newColors.push(this.getColor(theme))
        }
      })
      
      this.chart.update()
    },
    getColor(theme) {
        let themeCode = theme.substring(0,1)
        switch (themeCode) {
          case "1":
            return this.colors[0]
          case "2":
            return this.colors[1]
          case "3":
            return this.colors[2]
          case "4":
            return this.colors[3]
        }
    },
    transformData(data) {
      let actionsCount = _.groupBy(data,'theme')
      actionsCount = _.map(actionsCount,(value,key) => {
        return {
          theme:key,
          count:_.reduce(value, (total, o) => {
                    return total + o.montant
                },0)
        }
      })
      actionsCount = _.sortBy(actionsCount,'theme')
      return actionsCount
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div {
    width: 100%;
    padding:1px;
  }
</style>