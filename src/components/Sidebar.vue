<template>
      <div id="sidebar">
        <ul>
          <li>
            a
          </li>
          <li>
            b
          </li>
        </ul>
      </div>
</template>


<script>

import "leaflet/dist/leaflet.css";


export default {
  name: 'Sidebar',
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
  margin: 0px;
  padding:10px;
}

</style>
