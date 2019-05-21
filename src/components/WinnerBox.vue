<template>
  <div class="modalBox" v-if="show">
    <div class="modalContent">
        <div class="header">
            <button class="button-close" v-on:click='close'>x</button>
        </div>
        <div class="winning-player">
            <h1>Winner!</h1>
            <h2>{{winner().name}}</h2>
        </div>
        <div class="guesses">
            <!-- This is where we will have the amount of guesses -->
        </div>

    </div>
  </div>
</template>

<script>
export default {
  computed: {
      //This function will get the boolean if the modal box should be visible or not.
      show: function() {
          return this.$store.state.isWinnerBoxVisible;
      },
      //This is a method to get the amount of guesses needed to get the correct answer.
      guesses: function() {

      }
  },
  methods: {
      //This method calls the mutation (in store) for closing the modal box
      close: function() {
        this.$store.commit('closeWinnerBox');
      },
      /*
        This method shows the player that is the current guesser. This should be
        called when we open the modal box.
      */
      winner: function() {
          var players = this.$store.state.activePlayers;

          for(var i = 0; i < players.length; i++) {
              if(players[i].isMyTurn == true) {
                  return players[i];
              }
          }
      },
  }
}
</script>

<style scoped>
.modalBox {
  display: table;
  position: fixed;
  padding: 10px;
  z-index: 1;
  width: 100%;
  height:100%;
  overflow: auto; /* Enables scroll if needed*/
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modalContent {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    height: 98%;
}

.button-close {
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
