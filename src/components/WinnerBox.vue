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
      //This function will reset several states so that the game is replayable. It's called from the play again button.
      replay: function() {
        this.$store.commit('defaultLowestNumber');
        this.$store.commit('defaultHighestNumber');
        this.$store.commit('defaultGameState');
        this.$store.commit('defaultRound');
        this.$store.commit('defaultGuessNumber');
        this.$store.commit('defaultWinnerBoxVisibility');
        this.$store.commit('defaultQuestions');
        this.$store.commit('defaultModeratorAnswer');
        this.$store.commit('defaultActivePlayersGuess');
        this.$store.commit('defaultDisableInputButton');
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
  background-color: whitesmoke;
  padding: 20px 30px;
  color: black;
  font-size: 18px;
  margin: 10% auto;
  width: 60%;
  height: 60%;
}

.cup{
  width: 20vw;
}
.winning-player{
  margin-top: 30%;
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
  color: #4aae9b;
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
</style>
