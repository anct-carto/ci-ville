<template>
  <div class="row">
    <div class="col-md-5 wrapper" id="sidepanel-container">
      <SidePanel id="sidepanel"/>
    </div>
    <div class="col-7">
      <Table/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SidePanel from '@/components/SidePanel.vue'
import Table from '@/components/Table.vue'

export default {
  name: 'Home',
  components: { 
    SidePanel,Table
  }
}

</script>
