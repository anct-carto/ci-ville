<template>
      <div>
        <canvas id="theme-chart"></canvas>
      </div>
</template>


<script>

import Chart from 'chart.js/auto';
import actionsSource from '@/assets/actions-2020.json'
import * as aq from 'arquero'
import {mapState} from 'vuex'

export default {
  name: 'ThemeChart',
  data() {
    this.chart = null
    return {
      actions:this.$store.state.data,
      filterMode:false,
      clicked:false
    }
  },
  computed: {
    ...mapState({
      filterCode: state => state.filterCode,
    }),
    // actions() {
    //   return this.$store.state.filteredData
    // },
    actionsCount() {
      let actionsCount = this.countActions()
      return actionsCount
    },
  },
  watch: {
    filterCode() {
      this.actions = actionsSource.filter(e => {
        return e.codgeo == this.filterCode
      });

      this.actionsCount = this.countActions();
      let dataset = this.actionsCount.map(e => e.count );
      let labels = this.actionsCount.map(e => e.theme );
      
      this.chart.data.datasets[0].data = dataset;
      this.chart.data.labels = labels;
      console.log(dataset);
      this.chart.update()
    }
  },
  mounted() {
    this.createDoghnut();
  },
  methods: {
    createDoghnut() {
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

              this.selected = themeSelected
              // 2. ... à transmettre au store
              this.$store.commit('crossFilter',{type:'theme',value:themeSelected}); // filtrage de tout le jeu de données sur le thème
              this.$store.commit('updateThemeColor',color); // thème sélectionné à appliquer à la carte
  
              // 3. style en gris les autres éléments du graphique
              let datasetColors = chart.data.datasets[point[0].datasetIndex].backgroundColor;
  
              for(let i=0;i<datasetColors.length;i++) {
                if(datasetColors[i] != color) {
                  datasetColors[i] = "lightgrey"
                } else {
                  datasetColors[i] = this.getbgColors()[i]
                }
              }
  
              this.chart.update();
              // si cliqué précédemment
              // if(this.selected != themeSelected) {
              // } else {
              //   console.log(this.selected);
              //   this.$store.commit('clearFilter','theme')
              // }
            }
          },
          onHover:(evt,activeElem) => {
            // console.log(e);
            // 3. surligne  l'élément cliqué
            activeElem.length > 0 ? evt.chart.canvas.style.cursor = 'pointer' : evt.chart.canvas.style.cursor = 'default';
          },
          plugins: {
              legend: {
                  display: true,
                  position:'right',
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
                    return `${tooltip.label} : ${tooltip.parsed.toLocaleString("fr-FR")}`
                  }
                }
              }
          },
          layout: {
            padding:10
          },
          responsive:true,
          maintainAspectRatio:false
        }
      };
      
      // initialisation sur la page
      let chart = new Chart(ctx, chartOptions);
      this.chart = chart;
  
    },
    getbgColors() {
      let bgColorsArray = [];
      let themes = this.actionsCount.map(e => e.theme);
      themes.forEach(theme => {
        switch (theme) {
          case "1 - Pilier cohésion sociale":
            bgColorsArray.push('#DA837B')
            break
          case "2- Pilier développement économique et emploi":
            bgColorsArray.push('#6F2481')
            break
          case "3-Pilier cadre de vie et renouvellement urbain":
            bgColorsArray.push('#399AD2')
            break
          case "4-Pilotage, ingénierie, ressources et évaluations":
            bgColorsArray.push('#A3934C')
            break
        }
      });
      return bgColorsArray
    },
    countActions() {
      return aq.from(this.actions)
            .groupby('theme')
            .count()
            .orderby('theme')
            .objects();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div {
  width: 100%;
  background-color: white;
  padding:1px;
}

canvas {
  /* height: 270px; */
  /* height:30vh */
  /* height:30% */
}


</style>
