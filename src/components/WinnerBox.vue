<template>
  <div class="modalBox" v-if="show">
    <div class="modalContent">
        <div class="header">
            <button class="button-close" v-on:click='close'>x</button>
        </div>
        <div class="winning-player">
            <h1>Winner!</h1>
            <img class="cup" v-bind:src="winner().image">
            <h2>{{winner().name}}</h2>
        </div>
        <div class="guesses">
          The correct answer was: {{correctAnswer}}
        </div>
        <div>Total guesses: {{guesses}}</div>
        <button class="add-button" type="button" v-on:click="addWinnerToScoreBoard()">Add to Scoreboard</button>
        <div>
          <!--
            A button which will route you to main menu and
            call a function that will reset values to default.
          -->
          <router-link to="/">
            <button class="again-button" type="button" @click="replay()">Play Again</button>
          </router-link>

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
          return this.$store.state.round;
      },

      correctAnswer(){
          return this.$store.state.question.answer;
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
      //This function adds current player to the scoreBoard in store.
      addWinnerToScoreBoard: function() {
        //This gives us the amount of guesses
        var round = this.$store.state.round;
        var player = { name: "", guesses: round };
        var players = this.$store.state.activePlayers;

        //This gets the winner and adds the winners name to our player object.
        for(var i = 0; i < players.length; i++) {
          if(players[i].isMyTurn == true) {
            player.name = players[i].name;
          }
        }
        //Push the player object to the scoreboard in store.
        this.$store.state.scoreBoard.push(player);

      },
      //This function will reset several states so that the game is replayable. It's called from the play again button.
      replay: function() {
        this.$store.commit('defaultStates');
        this.$store.commit('defaultActivePlayersMyTurn');
        this.$store.commit('defaultActivePlayersGuess');
      },
  }
}
</script>

<style scoped>
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
  text-align: center;
  background-image: url("../assets/divbg.jpg");
  background-size: contain;
  background-repeat: repeat;
  padding: 20px 30px;
  color: black;
  font-size: 18px;
  margin: 5% auto;
  width: 60%;
  height: 75vh;
}

.cup{
  height: 20vh;
}
.winning-player{
  margin-top: 10vh;
}

.button-close {
  float:inline-start;
  margin: 0px;
  cursor: pointer;
  float: right;
  border: none;
  font-size: 28px;
  padding: 0px;
  font-weight: bold;
  color: black;
  background: transparent;
}
/*Temporary CSS for the replay button*/
.again-button{
  background-color: #fff;
  border: 2px solid black;
  border-radius: 12px;
  color: black;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  margin: 10px;
}
.add-button{
  background-color: #fff;
  border: 2px solid black;
  border-radius: 12px;
  color: black;
  padding: 10px 20px;
  text-align: center;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  margin: 10px;
}
</style>
