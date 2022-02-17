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
      actions:this.$store.state.data,
      depGeom:dep_geom,
      actionsCount:'',

    }
  },
  computed: {
    // initialisation carte
    map() {
      // let extent = this.$route.query['@'].split(',');
      // console.log(extent);
      let map = L.map('map', {
        zoomControl:false
      }).setView([46.413220, 1.219482],6);
      L.control.zoom({position:'topright'}).addTo(map);
      // ajout fond département
      new L.GeoJSON(this.depGeom, {
        interactive:true,
        style:{
          fillColor:'rgb(245, 233, 223)',
          fillOpacity:1,
          weight:1,
          color:'rgb(255,255,255)'
        }
      }).addTo(map)
      return map
    },
    // CALQUES
    bubbleLayer() {
      // calque accueillant les cercles proportionnels
      return L.featureGroup({interactive:true}).addTo(this.map)
    },
    clickedBubbleLayer() {
      // calque accueillant le cercle de l'élément cliqué
      return L.layerGroup({interactive:true}).addTo(this.map)
    },
    hoveredLayer() {
      // calque accueillant le cercle de l'élément survolé au passage de souris
      return L.layerGroup({interactive:true}).addTo(this.map)
    },
    // variables globales du store
    filterKey() {
      return this.$store.state.filterKey
    },
    filterCodeGlobal() {
      return this.$store.state.filterCode
    },
    // calcul de la valeur max à enregistrer pour garder une valeur proportionnelle des cercles
    maxCount() {
      let actionsCount = aq.from(this.actions)
      .groupby('code_cv')
      .count()
      .objects();
      let max = actionsCount.reduce((a,b) => {
          return (a.count > b.count) ? a : b
      }).count;
      return max
    }
  },
  watch: {
    filterKey() {
      this.computeData();
      // animation cercles
      // this.bubbleLayer.eachLayer(layer => {
      //   layer.setStyle({fillColor:this.$store.state.themeColor});
      //   layer.eachLayer(e => {
      //     let newRadius = this.computeRadius(e.feature.properties["count"]);
      //     // console.log("old radius", e.getRadius());

      //     var interval = setInterval(function() {
      //       let currentRadius = e.getRadius();
      //       if (currentRadius < newRadius) {
      //         e.setRadius(++currentRadius);
      //         // console.log("new Radius", e.getRadius());
      //       } else if(currentRadius > newRadius) {
      //         e.setRadius(--currentRadius);
      //         // console.log("new Radius", e.getRadius());
      //       } else {
      //         // console.log("fini");
      //         clearInterval(interval);
      //         interval = undefined
      //       }
      //     }, 50);
      //   })
      // })
      this.bubbleLayer.clearLayers();
      this.drawBubbles();

      // regnérer la taille du cercle cliqué
      this.clickedBubbleLayer.clearLayers();
      let clickedFeature = this.pinSelected(this.filterCodeGlobal);
      clickedFeature.addTo(this.clickedBubbleLayer)

    },
    filterCodeGlobal(e) {
      this.clickedBubbleLayer.clearLayers();
      let clickedFeature = this.pinSelected(e);
      clickedFeature.addTo(this.clickedBubbleLayer);

      // change style des autres cercles au clic excepté celui cliqué
      // this.bubbleLayer.eachLayer(layer => {
      //   layer.eachLayer(e => {
      //     if(e.feature.properties.code_cv == this.filterCodeGlobal) {
      //       e.setStyle({fillColor:this.$store.state.themeColor})
      //       console.log(e);
      //     } else {
      //       e.setStyle({fillColor:'lightgrey'})
      //     }
      //   })
      // })
    }
  },
  mounted() {
    this.map.on('moveend',this.setMapExtent);
    this.drawBubbles();
  },
  methods: {
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

      this.actionsCount = actionsCount;

      // jointure géomtries CV / nb d'actions par CV
      this.cvGeom.features.forEach(e => {
        this.actionsCount.forEach(f => {
          if(e.properties.code_cv == f.code_cv) {
            e.properties.count = f.count
          }
        })
      });

      // tri décroissant pour afficher les plus petites valeurs en premier
      this.cvGeom.features.sort(function (a, b) {
        if (a.properties.count > b.properties.count) { return -1 }
        if (a.properties.count < b.properties.count) { return 1 }
      });
    },
    drawBubbles() {
      this.computeData();

      // représentation carto
      new L.GeoJSON(this.cvGeom, {
        interactive:true,
        filter:(feature) => {
          return feature.properties.count
        },
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius:this.computeRadius(feature.properties["count"]),
            fillColor:this.$store.state.themeColor,
            fillOpacity:.5,
            color:'white',
            weight:1
          })
          .on("click", () => {
            let code = feature.properties.code_cv;
            this.$store.state.filterCode = code;
            this.$store.commit('updateNbActions');
            this.$store.commit('crossFilter',{type:'cdv',value:code});

            this.clickedBubbleLayer.clearLayers();
            this.pinSelected(code).addTo(this.clickedBubbleLayer)
          })
          .on("mouseover", (e) => {
            // console.log(e);
            e.originalEvent.stopPropagation();
            this.hoveredFeature = feature.properties.code_cv
            // this.stylishHovered(feature)

            new L.marker(e.sourceTarget._latlng)
            .bindTooltip(feature.properties.lib_cv + "<br>" + feature.properties.count.toLocaleString() + " actions financées", {
              permanent:true,
              direction:'top'
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
    stylishHovered(feature) {
      let hoveredFeature = this.pinSelected(feature.properties.code_cv);
      hoveredFeature.addTo(this.hoveredLayer)
    },
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
        }
      });
      return selectedFeature;
      // selectedFeature.addTo(this.clickedBubbleLayer)
    },
    setMapExtent() {
      let map = this.map;
      let center = map.getCenter();
      let lat = center.lat.toFixed(4);
      let lng = center.lng.toFixed(4);
      let z = map.getZoom();
      this.$router.push({path:'contrat-de-ville', query: {'@':`${lat},${lng},${z}`}});
    },
    computeRadius(baseCount) {
      return Math.sqrt(baseCount)*(80/Math.sqrt(this.maxCount))
    }
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
  height:calc(100vh - 69px) !important;
  background: none;
}

</style>
