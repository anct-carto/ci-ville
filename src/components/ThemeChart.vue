<template>
      <div>
        <canvas id="theme-chart"></canvas>
      </div>
</template>


<script>

import Chart from 'chart.js/auto';
import * as _ from "underscore"
import {mapState} from 'vuex'

export default {
  name: 'ThemeChart',
  data() {
    this.chart = null
    return {
      filterMode:false,
      clicked:false
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
        actionsCount = this.countActions(filteredData);        
      } else {
        actionsCount = this.countActions(this.actions)
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
      let labels = this.actionsCount.map(e => {
        return e.theme
      });
      
      let dataset = this.actionsCount.map(e => {
        return e.count
      });

      const ctx = document.getElementById('theme-chart');

      let chartOptions = {
        type: 'doughnut',   // le type du graphique
        data:{
          labels: labels,
          datasets:[{
            label:'actionsCount',
            data:dataset,
            labels:labels,
            backgroundColor: this.getbgColors(),
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
              chart.data.datasets[point[0].datasetIndex].backgroundColor = this.getbgColors();

              let color = chart.data.datasets[point[0].datasetIndex].backgroundColor[point[0].index];
              let themeSelected = chart.data.datasets[point[0].datasetIndex].labels[point[0].index];
              let datasetColors = chart.data.datasets[point[0].datasetIndex].backgroundColor;
              this.datasetColors = datasetColors

              // 2. ... à transmettre au store
              // 2.1 ...si thème sélectionné est nouveau ou est différent du précédent sélectionné
              if(themeSelected != this.selected) {
                // enregistre la nouvelle variable
                this.selected = themeSelected;

                // filtre le filteredData dans le store
                this.$store.dispatch('crossFilter',{type:'theme',value:themeSelected}); // filtrage de tout le jeu de données sur le thème
                this.$store.dispatch('updateThemeColor',color); // thème sélectionné à appliquer à la carte

                // style en gris les autres éléments du graphique
                for(let i=0;i<datasetColors.length;i++) {
                  if(datasetColors[i] != color) {
                    datasetColors[i] = "lightgrey"
                  } else {
                    console.log("%c"+themeSelected,"background-color:"+this.getbgColors()[i]);
                    datasetColors[i] = this.getbgColors()[i]
                  }
                }
              } else {
                // 2.2 .. sinon efface le filtre thème appliqué
                // enregistre la nouvelle variable
                this.selected = null;

                this.$store.dispatch('resetTheme');

                // remet les couleurs d'origine 
                for(let i=0;i<datasetColors.length;i++) {
                  datasetColors[i] = this.getbgColors()[i]
                }
              }
              
              // actualise le graphique
              this.chart.update();
            } else {
              // 2.2 .. sinon efface le filtre thème appliqué
              // enregistre la nouvelle variable
              this.selected = null;

              this.$store.dispatch('resetTheme');

              // remet les couleurs d'origine 
              for(let i=0;i<this.datasetColors.length;i++) {
                this.datasetColors[i] = this.getbgColors()[i]
              }
              this.chart.update();

            }
          },
          onHover:(evt,activeElem) => {
            // console.log(e);
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
                  onClick: null, // désactive le filtre au clic sur un item de légende
                  // onHover: function handleHover(evt, item, legend) {
                  //   legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
                  //     colors[index] = index === item.index || color.length === 9 ? color : color + '4D';
                  //   });
                  //   legend.chart.update();
                  // },
                  // onLeave: function handleLeave(evt, item, legend) {
                  //   legend.chart.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
                  //     colors[index] = color.length === 9 ? color.slice(0, -2) : color;
                  //   });
                  //   legend.chart.update();
                  // }
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
      let chart = new Chart(ctx, chartOptions);
      this.chart = chart;
  
    },
    updateChart() {
      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.dataset;
      this.chart.data.datasets[0].labels = this.labels;
      // this.chart.data.datasets[0].backgroundColor = this.getbgColors();
      
      this.chart.update()
    },
    getbgColors() {
      let bgColorsArray = [];
      let themes = this.actionsCount.map(e => e.theme);
      themes.forEach(theme => {
        let themeCode = theme.substring(0,1)
        switch (themeCode) {
          case "1":
            bgColorsArray.push('#3b5fa9')
            break
          case "2":
            bgColorsArray.push('#009f79')
            break
          case "3":
            bgColorsArray.push('#293173') 
            break
          case "4":
            bgColorsArray.push('#ff9b4f')
            break
        }
      });
      return bgColorsArray
    },
    countActions(data) {
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
  /* background-color: white; */
  padding:1px;
}



</style>
