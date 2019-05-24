import Vue from 'vue'
import Vuex from 'vuex'

//images
import kalleAsset from "../assets/kalle.jpg";
import kajsaAsset from "../assets/kajsa.jpg";
import martinAsset from "../assets/martin.jpg";

Vue.use(Vuex);

export const store = new Vuex.Store({
    //Prevents changes in components without store involvement
    // strict: true,
    state: {
      //Array with questions and answers which the moderator gets from the store
      questionBank: [
        {
          iths: [
            {
              question: 'Hur högt är Mount Everest i antal meter räknat?',
              answer: 8848
            },
            {
              question: 'Hur många trappsteg är i ITHS trappuppgång?',
              answer: 135
            },
            {
              question: 'Hur högt är Eiffel-tornet i antal meter räknat?',
              answer: 324
            },
            {
              question: 'Hur många kort finns i en vanlig kortlek?',
              answer: 32
            },
            {
              question: 'Hur många dollar tjänar Bill Gates per minut?',
              answer: 23148
            },
          ]
        }
      ],
      //Array with bots
      bots: [
        {
          id: 1,
          name: 'Anna',
          guess: null,
          image: require("@/assets/kajsa.jpg"),
          isMyTurn: false,
          isHuman: false
        },
        {
          id: 2,
          name: 'Pelle',
          guess: null,
          image: require("@/assets/martin.jpg"),
          isMyTurn: false,
          isHuman: false
        },
      ],
      //Players & bots in the active game
      activePlayers: [
        { id: 0, name: "Player", guess: null, image: require("@/assets/kalle.jpg"), isMyTurn: true, isHuman: true }
      ],
      //This is the guess of players/bots, and moderator will get this number
      guessNumber: null,
      //If moderator says that the guess is too low, then it will become lowestNumber
      lowestNumber: 0,
      //If moderator says that the guess is too high, then it will become highestNumber
      highestNumber: 10000,
      //A boolean value to show or not show the modal box (winnerBox) when someone guessed correctly
      isWinnerBoxVisible: false,
    },
    getters: {
        //Get QuestionBank
        getQuestionBank: (state) => state.questionBank,
        //Get guessNumber
        getGuess: (state) => state.guessNumber
    },
    mutations: {

      submitGuessToStore(state, player) {
        state.activePlayers[player.id].guess = player.guess;
        if ((player.guess < state.questionBank[0].answer && player.guess > state.lowestNumber) || (player.guess < state.questionBank[0].answer && state.lowestNumber == null)) {
          state.lowestNumber = player.guess;
        }
        else if ((player.guess > state.questionBank[0].answer && player.guess < state.highestNumber) || (player.guess > state.questionBank[0].answer && state.highestNumber == null)) {
          state.highestNumber = player.guess;
        }


      },
      //This function pushes the player into the "activePlayers array"
        addToActivePlayers: function(state, payload) {
          state.activePlayers.push(payload);
        },
        //Changes the value of lowestNumber if payload is larger
        setLowestNumber: function(state, payload) {
          if (payload > state.lowestNumber) {
            state.lowestNumber = payload;
          }
        },
        //changes the value of highestNumber if payload is lesser
        setHighestNumber: function(state, payload) {
          if (payload < state.highestNumber) {
            state.highestNumber = payload;
          }
        },
        //close modal box
        closeWinnerBox: function(state) {
            state.isWinnerBoxVisible = false;
        },
        //open modal box
        openWinnerBox: function(state) {
            state.isWinnerBoxVisible = true;
        },
        //changes the guessNumber
        updateLastGuess(state, guess) {
          state.guessNumber = guess;
        },
        //changes the active players turn
        switchTurn(state, player) {
          player.guess = null;
          if (state.activePlayers[player.id].id == state.activePlayers.length - 1) {
            state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
            state.activePlayers[0].isMyTurn = !state.activePlayers[0].isMyTurn;
          } else {
            state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
            state.activePlayers[player.id + 1].isMyTurn = !state.activePlayers[player.id + 1].isMyTurn;
          }

          for (let i = 0; i < state.activePlayers.length; i++) {
            if (state.activePlayers[i].isMyTurn == true && state.activePlayers[i].isHuman == false) {
              this.dispatch('makeBotDecision', state.activePlayers[i])
            }
          }
        },
        // submit game setup. player name, bots, question
        gameSetup(state, payload) {
          alert(payload.playerName);
          if (payload.playerName != null) { // if playerName is not null
            state.activePlayers[0].name = payload.playerName; // changes the players name
          }
        }
    },
    actions: {
      makeBotDecision(context, player) {

        let randomTime = 1000 + Math.floor(Math.random() * 8000);

        setTimeout(function () {
          switch (player.id) {
            case 1:
              player.guess = context.state.lowestNumber + Math.floor((context.state.highestNumber - context.state.lowestNumber) / 2)
              break;
            case 2:
              player.guess = context.state.lowestNumber + (Math.floor(Math.random() * (context.state.highestNumber - context.state.lowestNumber)))
              break;

          }

          context.commit("updateLastGuess", player.guess);
          context.commit("submitGuessToStore", player);
          setTimeout(function () {


            context.commit("switchTurn", player)
          }, 3000)
        }, randomTime);

      }
    }
})
