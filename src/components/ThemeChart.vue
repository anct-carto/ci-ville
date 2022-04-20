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
      filteredData: state => state.filteredData
    }),
    actionsCount() {
      let actionsCount = this.countActions(this.actions)
      return actionsCount
    },
  },
  watch: {
    filterCode() {
      let actionsCount
      if(this.filterCode) {
        let filteredByCode = this.actions.filter(e => {
          return e.codgeo == this.filterCode
        });
        actionsCount = this.countActions(filteredByCode);        
      } else {
        actionsCount = this.countActions(this.actions)
      }

      let dataset = actionsCount.map(e => e.count );
      let labels = actionsCount.map(e => e.theme );
      
      this.chart.data.datasets[0].data = dataset;
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].labels = labels;
      // this.chart.data.datasets[0].backgroundColor = this.getbgColors();
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
              let datasetColors = chart.data.datasets[point[0].datasetIndex].backgroundColor;
              this.datasetColors = datasetColors

              // 2. ... à transmettre au store
              // 2.1 ...si thème sélectionné est nouveau ou est différent du précédent sélectionné
              if(themeSelected != this.selected) {
                // enregistre la nouvelle variable
                this.selected = themeSelected;

                // filtre le filteredData dans le store
                this.$store.commit('crossFilter',{type:'theme',value:themeSelected}); // filtrage de tout le jeu de données sur le thème
                this.$store.commit('updateThemeColor',color); // thème sélectionné à appliquer à la carte

                // style en gris les autres éléments du graphique
                for(let i=0;i<datasetColors.length;i++) {
                  if(datasetColors[i] != color) {
                    datasetColors[i] = "lightgrey"
                  } else {
                    datasetColors[i] = this.getbgColors()[i]
                  }
                }
              } else {
                // 2.2 .. sinon efface le filtre thème appliqué
                // enregistre la nouvelle variable
                this.selected = null;

                this.$store.dispatch('resetTheme');
                this.$store.commit('updateThemeColor','gray');

                // remet les couleurs d'origine 
                for(let i=0;i<datasetColors.length;i++) {
                  datasetColors[i] = this.getbgColors()[i]
                }
              }
              
              // actualise le graphique
              this.chart.update();
            } else {
              console.log(this.selected);
              // 2.2 .. sinon efface le filtre thème appliqué
              // enregistre la nouvelle variable
              this.selected = null;

              this.$store.dispatch('resetTheme');
              this.$store.commit('updateThemeColor','gray');

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
    getbgColors() {
      let bgColorsArray = [];
      let themes = this.actionsCount.map(e => e.theme);
      themes.forEach(theme => {
        switch (theme) {
          case "1 - Pilier cohésion sociale":
            bgColorsArray.push('#3b5fa9')
            break
          case "2- Pilier développement économique et emploi":
            bgColorsArray.push('#009f79')
            break
          case "3-Pilier cadre de vie et renouvellement urbain":
            bgColorsArray.push('#293173') 
            break
          case "4-Pilotage, ingénierie, ressources et évaluations":
            bgColorsArray.push('#ff9b4f')
            break
        }
      });
      return bgColorsArray
    },
    countActions(data) {
      let actionsCount = _.countBy(data,'theme')
      actionsCount = _.map(actionsCount,(value,key) => {
        return {
          theme:key,
          count:value
        }
      }).sort((a, b) => {
        if (a.count > b.count) { return -1 }
        if (b.count < b.count) { return 1 }
      });
      return actionsCount
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



</style>
