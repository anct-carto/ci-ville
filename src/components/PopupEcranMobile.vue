<template>
    <div class="modal fade" id="exampleModal" tabindex="10000" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Attention</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Ce site n'est pas adapté aux écrans de smartphones et tablettes.  
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-principal" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
import { Modal } from "bootstrap"

export default {
    mounted() {
        let local = localStorage.getItem('session_local');
        if(!local) {
            localStorage.setItem("session_local",'ok')
            const exampleModalEl = document.getElementById('exampleModal');
            const modal = new Modal(exampleModalEl);
            setTimeout(() => modal.show(), 500);
        } 
  },
}
</script>

<style>
.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.btn-principal {
  font-size: 1.3em;
  border-radius: 20px;
  width: 20%;
  color:white;
  background: var(--rose-gerr);
  border: solid 1px var(--rose-gerr);
  font-family: 'Marianne-Bold';
}

.btn-principal:hover {
  background: none;
  border: solid 1px var(--rose-gerr);
  color: var(--rose-gerr);
}

</style>