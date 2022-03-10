<template>
  <div class="widget">
      <div class="header">
          {{ title }}
          <span style="float:right">?</span>
      </div>
      <div class="body">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style>

.widget {
  background: white;
  box-shadow: 0 2px 2px rgba(0,0,0,.09), 0 0px 2px rgba(0,0,0,.1);
  border-radius: 5px;
  padding:10px !important;
  margin-bottom:10px;
  /* border:solid 1px #dfdfdf */
}

.header {
    font-family: 'Marianne-Bold';
    font-size: 1.3em;
}

</style>