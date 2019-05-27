<template>
  <div class="playerArea">
    <div
      class="player"
      v-for="(player, index) in players"
      v-bind:key="index"
      v-bind:class="{myTurn: player.isMyTurn}"
    >
    <div class="playerimg">
        <img v-bind:src="player.image">
    </div>
      {{player.name}}s answer is ...

      <div v-show="!player.isHuman">{{player.guess}}</div>
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

      //Increases active players guesses with +1
      this.$store.commit("updateGuesses", player);

      // the third commit switches player
      this.$store.commit("switchTurn", player);


    },

    randomPhrase() {
      let randomNumber = Math.random() * 3;
      return this.$store.state.phrases[randomNumber];
    }
  },


  computed: {
    // getting the activePlayers from the array in store
    players() {
      return this.$store.state.activePlayers;
    },


  }
};
</script>

<style scoped>
div {
  font-size: 18px;
}

/* This sets all the images to the same dimentions */
img {
    width: 50px;
    height: 50px;
}
.playerArea {
  display: grid;
  margin: 10px;
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

  width: 50%;
  float: center;
}
.myTurn {
  border: 1px solid black;
  background: greenyellow;
  padding: 10px;
  opacity: 1;
  margin: 5px;
}

/* First player row */
.player:nth-child(1) {
  grid-column: 1
}
/* Second player row */
.player:nth-child(2) {
  grid-column: 2;

}
/* Third player row */
.player:nth-child(3) {
  grid-column: 3;

}
/* Fourth player row */
.player:nth-child(4){
  grid-column: 4;
}



/* Input field and submit button */

#placeholder {
  grid-column: 1 / span 4;
  grid-row: 6;
  box-sizing: border-box;
  padding: 10px;
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
  width:30%;

  display: inline-block;
  font-size: 16px;
  margin: auto;
  cursor: pointer;
}
#okButton:hover {
  /* brightness(0.4);  /* 40% brightness */
  filter: brightness(120%);
}
@media screen and (max-width:500px){
  #numberField{
    width: 80%;
  }
  #okButton {
    width: 80%;
  }
  /* First player row */
.player:nth-child(1) {
  grid-column: 1 / span 3;
  grid-row: 1;
}
/* Second player row */
.player:nth-child(2) {
  grid-column: 1 / span 3;
  grid-row: 2;
}
/* Third player row */
.player:nth-child(3) {
  grid-column: 1 / span 3;
  grid-row: 3;
}
/* Fourth player row */
.player:nth-child(4){
  grid-column: 1 / spans 3;
  grid-row: 4;

}

.playerimg {
  float: left;
}
}
</style>
