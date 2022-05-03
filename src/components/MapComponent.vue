<template>
    <div id="map"></div>
</template>


<script>

import cv_geom from '@/assets/geom_cv_ctr.json'
import dep_geom_ctr from '@/assets/geom_dep_ctr.json'
import reg_geom_ctr from '@/assets/geom_reg_ctr.json'
import dep_geom from '@/assets/geom_dep.json'
import cercles_drom from '@/assets/cercles_drom.json'
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
// import * as aq from 'arquero'
import {mapState} from 'vuex'
import * as _ from "underscore"

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})


export default {
  name: 'MapComponent',
  props: ['echelle','idGeo','libGeo'],
  data() {
    return {
      depGeom:dep_geom,
      cerclesDrom:cercles_drom
    }
  },
  computed: {
    // 1. variables globales du store
    // utilisation de mapstate, module de vuex, pour appeler les données présentes dans le state
    // plutôt que de faire à chaque fois return this.$store.state.data ... etc.
    ...mapState({
      actions: state => state.data,
      filterKey: state => state.filterKey,
      filterCodeGlobal: state => state.filterCode,
      themeColor: state => state.themeColor,
      annee: state => state.annee
    }),
    // choix du fichier de géométrie à charger en fonction del'échelle choisie : reg, dep ou cdv
    cvGeom() {
    // baseGeom() {
      if(this.echelle == "cdv") {
        return cv_geom
      } else if (this.echelle == "dep") {
        return dep_geom_ctr
      } else {
        return reg_geom_ctr
      }
    },
    // colonne d'identifiant geographique
    // idGeo() {
    // // baseGeom() {
    //   if(this.echelle == "cdv") {
    //     return "code_cv"
    //   } else if (this.echelle == "dep") {
    //     return "insee_dep"
    //   } else {
    //     return "insee_reg"
    //   }
    // },
    // 2. Initialisation carte avec fond 
    map() {
      // let extent = this.$route.query['@'].split(',');
      // console.log(extent);
      let map = L.map('map', {
        zoomControl:false,
        zoomSnap:0.05,
        minZoom:5.75,
      })
      // .setView([46.413220, 1.219482],6);

      L.control.zoom({position:'topright'}).addTo(map);
      // ajout fond cercles drom
      new L.GeoJSON(this.cerclesDrom, {
        interactive:false,
        style:{
          fillColor:'rgb(250,250,250)',
          color:'#3b5fa9',
          fillOpacity:1,
          weight:0.5,
        }
      }).addTo(map)

      // ajout fond département
       let bgGeom = new L.GeoJSON(this.depGeom, {
        interactive:false,
        style:{
          fillColor:'rgb(245, 233, 223)',
          fillOpacity:1,
          weight:1,
          color:'rgb(255,255,255)'
        }
      }).addTo(map)
      
      // map.fitBounds(geomDepLayer.getBounds())
      map.fitBounds(bgGeom.getBounds().pad(0.1,0.1,0.1,0.1))

      map.on("click", () => {
        this.clickedBubbleLayer.clearLayers()
        this.$store.dispatch('resetCodegeo')
      })

      return map
    },
    // 3. CALQUES
    bubbleLayer() {
      // calque accueillant les cercles proportionnels
      return L.featureGroup({interactive:true, className:'bubbles'}).addTo(this.map)
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
      // let actionsCount = aq.from(this.actions)
      // .groupby('codgeo')
      // .count()
      // .objects();
      // let max = actionsCount.reduce((a,b) => (a.count > b.count) ? a : b).count;
      let max = 1235;
      return max
    }
  },
  watch: {
    filterKey() {
      this.updateBubbles();
    },    
    annee() {
      this.updateBubbles()
    },
    filterCodeGlobal(e) {
      // efface contenu précédent calque si non vide, puis remplis le avec le cercle créé au choix d'un territoire
      this.clickedBubbleLayer.clearLayers();
      let clickedFeature = this.pinSelected(e);
      clickedFeature.addTo(this.clickedBubbleLayer);

      // change style des autres cercles au clic excepté celui cliqué
      // this.bubbleLayer.eachLayer(layer => {
      //   layer.eachLayer(e => {
      //     if(e.feature.properties.codgeo == this.filterCodeGlobal) {
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
      let actionsCount = _.countBy(data,'codgeo')
      actionsCount = _.map(actionsCount,(value,key) => {
        return {
          codgeo:key,
          count:value
        }
      })
      // let actionsCount = aq.from(data)
      // .groupby('codgeo')
      // .count()
      // .objects();

      // jointure géomtries CV / nb d'actions par CV
      this.cvGeom.features.forEach(e => {
        // supprimer au préalable le champ "count" car valeur précédente gardée si aucune actions dans le thème sélectionée
        if(e.properties.count) {
          delete e.properties.count
        }
        actionsCount.forEach(f => {
          if(e.properties[this.idGeo] == f.codgeo) {
            e.properties.count = f.count
            // !! ne pas oublier d'intégrer le codegeo
            e.properties["codgeo"] = f.codgeo
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
      this.$store.state.cvList = this.cvGeom.features.filter(e => e.properties.count>0).
      map(e => {
        return {
          codgeo:e.properties[this.idGeo],
          libgeo:e.properties[this.libGeo],
        }
      }).sort((a,b) => {
                if(a.libgeo<b.libgeo) return -1
                if(a.libgeo>b.libgeo) return 1
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
            weight:1,
            interactie:true,
            pane: 'markerPane'
          })
          .on("click", (e) => {
            L.DomEvent.stopPropagation(e);
            let code = feature.properties[this.idGeo];
            this.$store.commit('crossFilter',{type:'cdv',value:code});

            this.clickedBubbleLayer.clearLayers();
            this.pinSelected(code).addTo(this.clickedBubbleLayer)
          })
          .on("mouseover", (e) => {
            // console.log(e);
            e.originalEvent.stopPropagation();
            this.hoveredFeature = feature.properties[this.idGeo]
            this.stylishHovered(feature)

            // new L.marker(e.sourceTarget._latlng)
            // .bindTooltip(feature.properties[this.libGeo] + " : " + feature.properties.count.toLocaleString(), {
            //   permanent:true,
            //   direction:'top',
            //   className:'leaflet-tooltip'
            // })
            // .addTo(this.hoveredLayer);
          })
          .on("mouseout", () => {
            this.hoveredLayer.clearLayers();
          })
        }
      }).addTo(this.bubbleLayer);
    },
    updateBubbles() {
      this.computeData();
      
      // méthode 1 : animation cercles
      // this.bubbleLayer.eachLayer(layer => {
      //   layer.setStyle({fillColor:this.themeColor});
      //   let intervalDuration = 10
      //   layer.eachLayer(e => {
      //     let newRadius = this.computeRadius(e.feature.properties["count"]);

      //     if(newRadius != e.getRadius) {
      //       let intervalMinus = setInterval(() => {
      //         let currentRadius = e.getRadius();
      //         if(currentRadius<newRadius) {
      //           e.setRadius(++currentRadius)
      //         } else {
      //           clearInterval(intervalMinus)
      //         }
      //       }, intervalDuration);
  
      //       let intervalPlus = setInterval(() => {
      //         let currentRadius = e.getRadius();
      //         if(currentRadius>newRadius) {
      //           e.setRadius(--currentRadius)
      //         } else {
      //           clearInterval(intervalPlus)
      //         }
      //       }, intervalDuration);
      //     } 
      //   })
      // })
      // méthode 2 : regénérer les cercles (un peu plus long)
      this.bubbleLayer.clearLayers();
      this.drawBubbles();

      // regnérer la taille du cercle cliqué
      this.clickedBubbleLayer.clearLayers();
      let clickedFeature = this.pinSelected(this.filterCodeGlobal);
      clickedFeature.addTo(this.clickedBubbleLayer)

    },
    // créé un marqueur au dessus du cercle survolé 
    stylishHovered(feature) {
      let hoveredFeature = this.pinSelected(feature.properties[this.idGeo]);
      hoveredFeature.addTo(this.hoveredLayer)
    },
    // créé un cercle correspond similaire à celui qui a été cliqué
    pinSelected(code) {
      let selectedFeature = new L.GeoJSON(this.cvGeom, {
        filter:feature => {
          return feature.properties[this.idGeo] == code
        },
        pointToLayer: (feature, latlng) => {
          // this.map.flyTo(latlng)
          return L.circleMarker(latlng, {
            radius:this.computeRadius(feature.properties["count"]),
            color:'red',
            fillOpacity:.8,
            fillColor:this.themeColor,
            opacity:1,
            weight:2,
            interactive:false,
            pane: 'markerPane'
          }).bindTooltip(`${feature.properties[this.libGeo]} (${feature.properties[this.idGeo]}) : ${feature.properties.count.toLocaleString()}`, {
            permanent:true,
            direction:'top',
            className:'leaflet-tooltip-custom',
            offset:[0,-this.computeRadius(feature.properties["count"])]
          }).openTooltip()
        },
        interactive:false
      });
      return selectedFeature;
      // selectedFeature.addTo(this.clickedBubbleLayer)
    },
    // calcul du rayon des cercles
    computeRadius(baseCount) {
      // changer la valeur "100" pour agrandir ou réduire la taille max des cercles
      return Math.sqrt(baseCount)*(65/Math.sqrt(this.maxCount))
    },
    setMapExtent() {
      let map = this.map;
      let center = map.getCenter();
      let lat = center.lat.toFixed(4);
      let lng = center.lng.toFixed(4);
      let z = map.getZoom();
      this.$router.push({path:this.$route.path, query: {'@':`${lat},${lng},${z}`}});
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

#map {
  width: auto;
  height:calc(100vh - 150px) !important;
  background: white;
  /* box-shadow: 0 2px 2px rgba(0,0,0,.02), 0 0px 2px rgba(0,0,0,.01); */
  border-radius: 5px;
}

.leaflet-tooltip-custom {
  font-family: 'Marianne-Regular';
  font-size:1em;
  background: rgba(0,0,0,.85);
  color:white;
  border-radius:6px;
  border:0px;
  padding:3px 6px 3px 6px;
  box-shadow: none;
}

.leaflet-tooltip-top::before {
  bottom: 0;
  margin-bottom: -12px;
  border-top-color:rgba(0,0,0,.85);
}

</style>
