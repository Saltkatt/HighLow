<template>
  <div class="modalBox">
    <div class="modalContent">

    </div>
  </div>

</template>

<script>
export default {
  name: 'WinnerBox',
  data() {

  }
}
</script>

<style scoped>
.modalBox {
  display: table;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  width: 90%;
  height:90%;
  overflow: auto; /* Enables scroll if needed*/
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}
</style>
