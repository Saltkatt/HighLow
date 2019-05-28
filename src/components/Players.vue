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
    width: 70px;
    height: 70px;
}
/* Player positions */
.playerArea {
  display: grid;
  grid-template-areas: 
  '. . hp b1 b2 b3'
  'in in in in in in ';
  grid-row-gap: 5%;
  
}
/* Inactive players */
.player {
  padding: 10px;
  opacity: 0.2;
  margin: 5px;
}
/* Player image position */
.playerimg {
  /* width: 50%; */
  float: center;
}
/* Active player */
.myTurn {
  padding: 10px;
  opacity: 1;
  margin: 5px;
}

/* First player row */
.player:nth-child(1) {
  grid-area: hp;
  padding-left: 150px;
}
/* Second player row */
.player:nth-child(2) {
  grid-area: b1
 
}
/* Third player row */
.player:nth-child(3) {
  grid-area: b2;
  
}
/* Fourth player row */
.player:nth-child(4){
  grid-area: b3;
}


/* Input field and submit button */
#placeholder {
  grid-area: in;
  box-sizing: border-box;
  background-color: burlywood;
  padding:5px; 
  margin-bottom: 2%;
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

.playerArea {
  display: grid;
  grid-template-areas: 
  'hp hp hp hp'
  'b1 b1 b1 b1'
  'b2 b2 b2 b2'
  'b3 b3 b3 b3'
  'in in in in';
  grid-row-gap: 5%;
  
}
/* First player row */
div.player:nth-child(1) {
  padding-left: 0px;
  padding: 10px;
  
}


.playerimg {
  float: left;
}
}
</style>
