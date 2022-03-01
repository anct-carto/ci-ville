<template>
    <div id="map"></div>
</template>


<script>

// import actions from '@/assets/actions_financees.json'
import cv_geom from '@/assets/cv_geom.json'
import dep_geom from '@/assets/geom_dep.json'
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import * as aq from 'arquero'
import {mapState} from 'vuex'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})


export default {
  name: 'MapComponent',
  data() {
    return {
      cvGeom:cv_geom,
      depGeom:dep_geom,
    }
  },
  computed: {
    // 1. variables globales du store
    // utilisation de mapstate, module de vuex, pour appeler les données présentes dans le state
    // plutôt que de faire à chaque fois return this.$store.state.data ... etc.
    ...mapState({
      actions: state => state.data,
      filterKey: state => state.filterKey,
      filterCodeGlobal: state => state.filterCodeGlobal,
      themeColor: state => state.themeColor
    }),
    // 2. Initialisation carte avec fond 
    map() {
      // let extent = this.$route.query['@'].split(',');
      // console.log(extent);
      let map = L.map('map', {
        zoomControl:false,
        zoomSnap:0.05,
        minZoom:6
      }).setView([46.413220, 1.219482],6);

      L.control.zoom({position:'topright'}).addTo(map);
      // ajout fond département
      new L.GeoJSON(this.depGeom, {
        interactive:false,
        style:{
          fillColor:'rgb(245, 233, 223)',
          fillOpacity:1,
          weight:1,
          color:'rgb(255,255,255)'
        }
      }).addTo(map)
      
      return map
    },
    // 3. CALQUES
    bubbleLayer() {
      // calque accueillant les cercles proportionnels
      return L.featureGroup({interactive:true}).addTo(this.map)
    },
    clickedBubbleLayer() {
      // calque accueillant le cercle surligné de l'élément cliqué
      return L.layerGroup({interactive:true}).addTo(this.map)
    },
    hoveredLayer() {
      // calque accueillant le cercle créé au passage de souris
      return L.layerGroup({interactive:false}).addTo(this.map)
    },
    // 4. calcul valeur max à utilisée pour garder proportionnalité des cercles
    maxCount() {
      let actionsCount = aq.from(this.actions)
      .groupby('code_cv')
      .count()
      .objects();
      let max = actionsCount.reduce((a,b) => (a.count > b.count) ? a : b).count;
      return max
    }
  },
  watch: {
    filterKey() {
      // méthode animation cercles
      this.computeData();
      this.bubbleLayer.eachLayer(layer => {
        layer.setStyle({fillColor:this.themeColor});
        layer.eachLayer(e => {
          let newRadius = this.computeRadius(e.feature.properties["count"]);

          if(newRadius != e.getRadius) {
            let intervalMinus = setInterval(() => {
              let currentRadius = e.getRadius();
              if(currentRadius<newRadius) {
                e.setRadius(++currentRadius)
              } else {
                clearInterval(intervalMinus)
              }
            }, 10);
  
            let intervalPlus = setInterval(() => {
              let currentRadius = e.getRadius();
              if(currentRadius>newRadius) {
                e.setRadius(--currentRadius)
              } else {
                clearInterval(intervalPlus)
              }
            }, 10);            
          } 
        })
      })
      // méthode 2 : regénérer les cercles (un peu plus long)
      // this.bubbleLayer.clearLayers();
      // this.drawBubbles();

      // regnérer la taille du cercle cliqué
      this.clickedBubbleLayer.clearLayers();
      let clickedFeature = this.pinSelected(this.filterCodeGlobal);
      clickedFeature.addTo(this.clickedBubbleLayer)
    },
    filterCodeGlobal(e) {
      // efface contenu précédent calque si non vide, puis remplis le avec le cercle créé au choix d'un territoire
      this.clickedBubbleLayer.clearLayers();
      let clickedFeature = this.pinSelected(e);
      clickedFeature.addTo(this.clickedBubbleLayer);

      // change style des autres cercles au clic excepté celui cliqué
      // this.bubbleLayer.eachLayer(layer => {
      //   layer.eachLayer(e => {
      //     if(e.feature.properties.code_cv == this.filterCodeGlobal) {
      //       e.setStyle({fillColor:this.themeColor})
      //       console.log(e);
      //     } else {
      //       e.setStyle({fillColor:'lightgrey'})
      //     }
      //   })
      // })
    }
  },
  mounted() {
    this.computeData();
    this.drawBubbles();
    this.map.on('moveend',this.setMapExtent);
  },
  methods: {
    // FONCTIONS APPELEES
    // agrégation par code cv avant de faire la carte
    computeData() {
      let data = this.actions;
      // filtrer sur modalité sélectionnée dans le doghnut (si sélectionnée)
      if(this.filterKey) {
        data = data.filter(e => {
          return e.theme == this.filterKey
        });
      }

      // grouper pour compter par code
      let actionsCount = aq.from(data)
      .groupby('code_cv')
      .count()
      .objects();

      // jointure géomtries CV / nb d'actions par CV
      this.cvGeom.features.forEach(e => {
        // supprimer au préalable le champ "count" car valeur précédente gardée si aucune actions dans le thème sélectionée
        if(e.properties.count) {
          delete e.properties.count
        }
        actionsCount.forEach(f => {
          if(e.properties.code_cv == f.code_cv) {
            e.properties.count = f.count
          }
        })
        if(e.properties.count === undefined) {
          e.properties.count = 0
        }
      });

      // tri décroissant pour afficher les plus petites valeurs en premier
      this.cvGeom.features.sort(function (a, b) {
        if (a.properties.count > b.properties.count) { return -1 }
        if (a.properties.count < b.properties.count) { return 1 }
      });
      
      // alimenter liste contrats de ville présents sur la carte vers liste déroulante
      this.$store.state.cvList = this.cvGeom.features.map(e => {
        return {
          code_cv:e.properties.code_cv,
          lib_cv:e.properties.lib_cv,
        }
      }).sort((a,b) => {
                if(a.lib_cv<b.lib_cv) return -1
                if(a.lib_cv>b.lib_cv) return 1
                return 0
      });
    },
    // représentation carto
    drawBubbles() {
      new L.GeoJSON(this.cvGeom, {
        interactive:true,
        filter:(feature) => {
          if(feature.properties.count > 0) {
            return true
          }
        },
        pointToLayer: (feature, latlng) => {
          // à partir des latlng, retourne les cercles proportionnels
          return L.circleMarker(latlng, {
            radius:this.computeRadius(feature.properties["count"]),
            fillColor:this.themeColor,
            fillOpacity:.5,
            color:'white',
            weight:1
          })
          .on("click", () => {
            let code = feature.properties.code_cv;
            this.$store.commit('crossFilter',{type:'cdv',value:code});

            this.clickedBubbleLayer.clearLayers();
            this.pinSelected(code).addTo(this.clickedBubbleLayer)

            console.log(feature.properties.count);
          })
          .on("mouseover", (e) => {
            // console.log(e);
            e.originalEvent.stopPropagation();
            this.hoveredFeature = feature.properties.code_cv
            // this.stylishHovered(feature)

            new L.marker(e.sourceTarget._latlng)
            .bindTooltip(feature.properties.lib_cv + "<br>" + feature.properties.count.toLocaleString() + " actions financées", {
              permanent:true,
              direction:'top',
              className:'leaflet-tooltip'
            })
            .addTo(this.hoveredLayer);
          })
          .on("mouseout", () => {
            // console.log("ok");
            this.hoveredLayer.clearLayers();
          })
        }
      }).addTo(this.bubbleLayer);

    },
    // créé un marqueur au dessus du cercle survolé 
    stylishHovered(feature) {
      let hoveredFeature = this.pinSelected(feature.properties.code_cv);
      hoveredFeature.addTo(this.hoveredLayer)
    },
    // créé un cercle correspond similaire à celui qui a été cliqué
    pinSelected(code) {
      let selectedFeature = new L.GeoJSON(this.cvGeom, {
        filter:feature => {
          return feature.properties.code_cv == code
        },
        pointToLayer: (feature, latlng) => {
          // this.map.flyTo(latlng)
          return L.circleMarker(latlng, {
            radius:this.computeRadius(feature.properties["count"]),
            color:'red',
            fillOpacity:0,
            opacity:1,
            weight:2
          })
        },
        interactive:false
      });
      return selectedFeature;
      // selectedFeature.addTo(this.clickedBubbleLayer)
    },
    // calcul du rayon des cercles
    computeRadius(baseCount) {
      // changer la valeur "100" pour agrandir ou réduire la taille max des cercles
      return Math.sqrt(baseCount)*(100/Math.sqrt(this.maxCount))
    },
    setMapExtent() {
      let map = this.map;
      let center = map.getCenter();
      let lat = center.lat.toFixed(4);
      let lng = center.lng.toFixed(4);
      let z = map.getZoom();
      this.$router.push({path:'contrat-de-ville', query: {'@':`${lat},${lng},${z}`}});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#map {
  width: auto;
  /* height:calc(100vh - 69px) !important; */
  height:calc(100vh - 80px) !important;
  background: none;
    background: white;
  box-shadow: 0 2px 2px rgba(0,0,0,.02), 0 0px 2px rgba(0,0,0,.01);
  border-radius: 5px;
}

.leaflet-tooltip {
  text-align: center !important;
  align-content: center !important;
}

</style>
