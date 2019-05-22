<template>
  <div class="modalBox" v-show="isRulesClicked">
    <div>
      <div class="header">
        <button class="button-close" v-on:click="showRules">x</button>
      </div>
      <div class="modalContent">
        <p>1. All questions have numerical answers and I expect you answer using digits.</p>
        <p>2. Everyone will have one opportunity to answer once per round.</p>
        <p>3. The game will continue until someone has answered correctly.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showRules() {
      this.$store.commit("showRules");
    }
  },
  computed: {
    //This function will get the boolean if the modal box should be visible or not.
    isRulesClicked: function() {
      return this.$store.state.showRules;
    }
  }
};
</script>

<style>
.modalBox {
position: absolute;

}

.modalContent {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  width: 80%;
  height: 90%;
  color: black;
  font-size: 18px;
}

.button-close {
  margin: 24px;
  cursor: pointer;
  float: right;
  border: none;
  font-size: 20px;
  padding: 20px;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}
</style>
