<template>
    <div id="loading" v-if="!this.$store.state.filteredData">
        <div class="row">
            <div class="spinner-border" role="status"></div>
        </div>
        <div class="row">
            <p>Chargement en cours ...</p>
        </div>
    </div>
</template>

<style>

#loading {
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  left:0;
  top:0;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,.7);
  z-index: 20000;
  color:white;
  flex-direction: column;
  overflow-x: hidden;
}

</style>