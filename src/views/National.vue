<template>
    <div class="row h-100">
      <div class="col-sm-5" id="sidepanel-container">
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
