<template>
    <div class="row">
      <div class="col-sm-5" id="sidepanel-container">
         <SidePanel id="sidepanel"/>
      </div>
      <div class="col-7">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Liste des actions</button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <TableActions id="table-actions"/>
              </div>
            </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import SidePanel from '@/components/SidePanel.vue'
import TableActions from '@/components/TableActions.vue'

export default {
  name: 'Home',
  components: { 
    SidePanel,
    TableActions,
  }
}

</script>

<style scoped>
  #sidepanel-container {
    height: 85vh;
  }
</style>
