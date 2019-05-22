<template>
  <div class="playerArea">
    <div
      class="player"
      v-for="(player, index) in players"
      v-bind:key="index"
      v-bind:class="{myTurn: player.isMyTurn}"
    >
      {{player.name}}s answer is ...
      <div class="playerimg">
        <img v-bind:src="player.image">
      </div>
      <div v-show="!player.isHuman">{{player.guess}}</div>
    </div>
    <div class="container4">
      <div class="round">
        <h3>Round: 2</h3>
      </div>
      <div class="time">
        <h3>Time:</h3>
      </div>
    </div>
    <div id="placeholder">
      <input
        id="numberField"
        placeholder="0000"
        name="thisNumber"
        type="number"
        v-model.number.lazy="players[0].guess"
        min="-500000"
        max="500000"
        step="1"
      >
      <input
        id="okButton"
        type="submit"
        value="OK"
        @click="makeGuess(players[0])"
        :disabled="!players[0].isMyTurn"
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {

    // this method is called when the submit button is clicked and calls three mutations in store
    makeGuess(player) {

      // the first commit changes the variable guessNumber in store, which is the value the moderator is validating
      this.$store.commit("updateLastGuess", player.guess);

      // the second commit changes the players personal guess value, which is the value showing up in the player field
      this.$store.commit("submitGuessToStore", player);

      // the third commit switches player
      this.$store.commit("switchTurn", player);
    },

    randomPhrase() {
      let randomNumber = Math.random() * 3;
      return this.$store.state.phrases[randomNumber];
    }
  },

  // getting the activePlayers from the array in store
  computed: {
    players() {
      return this.$store.state.activePlayers;
    }
  }
};
</script>

<style scoped>
div {
  font-size: 18px;
}

.playerArea {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto auto auto;
  border: 1px solid black;
  background: lightskyblue;
}

.player {
  border: 1px solid black;
  background: greenyellow;
  padding: 10px;
  opacity: 0.2;
  margin: 5px;
}

.playerimg {
  /* display: inline-block;
  position: relative; 
  right:  50%; */

  float: left;
}
.myTurn {
  border: 1px solid black;
  background: greenyellow;
  padding: 10px;
  opacity: 1;
  margin: 5px;
}

.player:nth-child(1) {
  grid-column: 1 / span 3;
  grid-row: 1;
}
.player:nth-child(2) {
  grid-column: 1 / span 3;
  grid-row: 2;
}
.player:nth-child(3) {
  grid-column: 1 / span 3;
  grid-row: 3;
}

/* Round and Time container */
.container4 {
  grid-column: 1 / span 3;
  grid-row: 4;
  display: grid;
  grid-template-columns: auto auto;
  background-color: deeppink;
  padding: 10px;
}

.round {
  background-color: honeydew;
}

.time {
  background-color: turquoise;
}

/* Input field and submit button */

#placeholder {
  grid-column: 1 / span 3;
  grid-row: 5;
  box-sizing: border-box;
}
#numberField {
  margin: auto;
  padding: 16px 32px;
  width: 60%;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
  cursor: pointer;
}

#okButton {
  background-color: gold;
  border: 1px solid black;
  border-radius: 8px;
  padding: 16px 32px;
  width: 25%;
  display: inline-block;
  font-size: 16px;
  margin: auto;
  cursor: pointer;
}
#okButton:hover {
  /* brightness(0.4);  /* 40% brightness */
  filter: brightness(120%);
}
</style>
