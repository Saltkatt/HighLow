<template>
  <div class="playerArea">
    <div
      class="player2"
      v-for="(player, index) in players"
      v-bind:key="index"
      v-bind:class="{myTurn: player.isMyTurn}"
    >
      <div class="profileImageArea">
        <img class="profileImage" v-bind:src="player.image" alt>
      </div>

      <div class="nameArea">
        <div class="name">{{player.name}}</div>
      </div>

      <div class="slateArea">
        <img class="slate" v-bind:src="player.slateImage" alt>
        <div class="playerGuessInSlate">{{player.guess}}</div>
      </div>
    </div>

    <div class="inputArea" v-bind:class="{invisible: !players[0].isMyTurn}">
      <input class="inputField" type="number" v-model.number.lazy="players[0].guess">
      <input
        id="submitButton"
        type="submit"
        value="Submit"
        @click="makeGuess(players[0])"
        :disabled="inputButtonState"
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // this method is called when the submit button is clicked and calls three mutations in store
    makeGuess(player) {
      //toggles the input button
      this.$store.commit("toggleInputButton");

      // the first commit changes the variable guessNumber in store, which is the value the moderator is validating
      this.$store.commit("updateLastGuess", player.guess);

      // the second commit changes the players personal guess value, which is the value showing up in the player field
      this.$store.commit("submitGuessToStore", player);

      // delays the answer from the moderator
      this.$store.commit("delayModeratorAnswer");

      // see whos turn it is
      this.$store.commit("seeWhosTurn", player);

      //Increases active players guesses with +1
      // this.$store.commit("updateGuesses", player);
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

    getLastGuess() {
      return this.$store.state.lastGuess;
    },

    inputButtonState() {
      return this.$store.state.disableInputButton;
    }
  }
};
</script>

<style scoped>
div {
  font-size: 18px;
}

.playerArea {
  margin: 10px;
}

.player2 {
  height: 15vw;
  background-image: url("../assets/planka3.png");
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  width: 90%;
  justify-content: space-evenly;
  margin: 0 auto 3% auto;
  transition: 0.5s;
  opacity: 0.3;
}

.profileImageArea {
  background: none;
  width: 150px;
}

.profileImage {
  display: flex;
  height: 110%;
  position: relative;
  top: 0px;
  left: 0px;
}

.nameArea {
  display: flex;
  align-items: center;
  color: black;
}

.name {
  font-size: 5vw;
  margin-right: 40px;
}

.slateArea {
  background: none;
  position: relative;
  text-align: center;
  color: white;
}

.slate {
  width: 25vw;
  height: 90%;
  margin: 2% 0% 2% 0%;
}

.playerGuessInSlate {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 5vw;
}

.myTurn {
  transition: 0.8s;
  opacity: 1;
  animation-duration: 0.7s;
  animation-name: changewidth;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes changewidth {
  from {
    width: 90%;
  }

  to {
    width: 95%;
  }
}

.inputField {
  background-color: black;
  font-family: "Passion One", cursive;
  font-size: 5vw;
  color: whitesmoke;
  text-align: center;
  border: 1px solid brown;
  width: 50%;
  height: 5vh;
  margin-top: 2vh;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}

.inputField:focus {
  outline: none;
}

#submitButton {
  font-family: "Passion One", cursive;
  font-size: 5vw;
  width: 30%;
  height: 5.5vh;
  background-image: url("../assets/divbg.jpg");
  background-size: cover;
  background-repeat: repeat;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

#submitButton:focus {
  outline: none;
}

.invisible {
  opacity: 0;
}
@media screen and (min-width: 501px) {
  /* Player positions */
  .playerArea {
    display: grid;
    grid-template-areas:
      ". . hp b1 b2 b3"
      "in in in in in in ";
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
    grid-area: b1;
  }
  /* Third player row */
  .player:nth-child(3) {
    grid-area: b2;
  }
  /* Fourth player row */
  .player:nth-child(4) {
    grid-area: b3;
  }

  /* Input field and submit button */
  #placeholder {
    grid-area: in;
    box-sizing: border-box;
    background-color: burlywood;
    padding: 5px;
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
    width: 30%;

    display: inline-block;
    font-size: 16px;
    margin: auto;
    cursor: pointer;
  }
  #okButton:hover {
    filter: brightness(120%);
  }
}
@media screen and (max-width: 500px) {
  #numberField {
    width: 80%;
  }
  #okButton {
    width: 80%;
  }

  .playerArea {
    display: grid;
    grid-template-areas:
      "hp hp hp hp"
      "b1 b1 b1 b1"
      "b2 b2 b2 b2"
      "b3 b3 b3 b3"
      "in in in in";
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
