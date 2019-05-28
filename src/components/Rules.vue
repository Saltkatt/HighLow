<template>
  <div class="modalBox" v-show="isRulesClicked">
    <div>
      <div class="header">
        
      </div>
      <div class="modalContent">
          <button class="button-close" v-on:click="showRules">x</button>
        <p>RULES</p>
        <p>1. All questions have numerical answers and you are expected to answer using digits.</p>
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
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  border: 1px solid black;
  background-color: #fefefe;
  background-color: rgba(0, 0, 0, 0.6);
}

.modalContent {
  
  text-align: left;
  background-color: #fff;
  padding: 30px 50px;
  color: black;
  font-size: 18px;
  margin: 10% auto;
  width: 60%;
  height: 80%;
}

.button-close {
  margin: 0px;
  cursor: pointer;
  float: right;
  border: none;
  font-size: 28px;
  padding: 0px;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}
</style>
