<template>
<div>
  <div class="playerArea">
    <div
      class="player"
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
  
  </div>




    <div class="inputArea" v-bind:class="{invisible: !players[0].isMyTurn}">

      <input class="inputField" type="number" v-model.number.lazy="players[0].guess">
      <input
        id="submitButton"
        type="submit"
        value="Submit"
        @click="makeGuess(players[0])"
        
      >
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    // this method is called when the submit button is clicked and calls three mutations in store
    makeGuess(player) {
      
      this.$store.commit("updateLastGuess", player.guess)
      this.$store.commit("toggleInputButton");
      /*
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
      */
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

/* Desktop */
@media screen and (min-width: 501px) {
  div {
  display: inline-block;
}
.playerArea {
  display: grid;
  grid-template-areas: 
  'hp b1 b2 b3' 
  'in in in in';
  grid-gap: 1.5%;
  align-content: center;
  justify-content: space-evenly;
  margin: 0 2vw 0 2vw;
}
.player{
  height: 15vw;
  display: grid;
  grid-template-areas: 
  'n n'
  'im s';
  width: 70%;
  
  margin: 0 auto 3% 3%;
  transition: 0.5s;
  opacity: 0.3;
}
.player:nth-child(1){
  grid-area: hp;
}
.player:nth-child(2){
  grid-area: b1;
}
.player:nth-child(3){
  grid-area: b2;
}
.player:nth-child(4){
  grid-area: b3;
}

.profileImageArea {
  background: none;
  width:100px;
  height:100px;
  
}
.profileImage {
  grid-area: im;
  height: 125%;
  position: relative;
  top: 0px;
  left: 10px;
}
.slateArea {
  grid-area: s;
  background: none;
  position: relative;
}
.slate {
  width: 12vw;
  margin: 20% 0% 0% 0%;
}
.playerGuessInSlate {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3vw;
}


.nameArea {
  grid-area: n;
  background-image: url("../assets/planka3.png");
  background-size: contain;
  background-repeat: no-repeat;
  align-items: center;
  color: black;
}
.name {
  font-size: 3vw;
  margin-right: 40px;
}

.myTurn {
  transition: 0.8s;
  opacity: 1;
  animation-duration: 0.7s;
  animation-name: changewidth;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

/* Input Field and Submit button */
.inputField {
  grid-area: in;
  background-color: black;
  font-family: "Passion One", cursive;
  font-size: 3vw;
  color: whitesmoke;
  text-align: center;
  border: 1px solid brown;
  width: 40%;
  margin-top: 10vh;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.inputField:focus {
  outline: none;
}

#submitButton {
  font-family: "Passion One", cursive;
  font-size: 3vw;
  width: 30%;
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
  


}

/* Small screen */
@media screen and (max-width: 500px) {

.playerArea {
  margin: 10px;
}

.player {
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

.nameArea{
  display: flex;
  align-items: center;
  color: black;
}

.name{
  font-size: 5vw;
  margin-right: 40px;
}

.slateArea {
  background: none;
  position: relative;
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

.inputField{
  background-color: black;
  font-family: 'Passion One', cursive;
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

.inputField:focus { outline: none; }

#submitButton {
  font-family: 'Passion One', cursive;
  font-size: 5vw;
  width: 30%;
  height: 5.5vh;
  background-image: url("../assets/divbg.jpg");
  background-size: cover;
  background-repeat: repeat;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

#submitButton:focus { outline: none; }

.invisible{
  opacity: 0;
}
}
</style>
