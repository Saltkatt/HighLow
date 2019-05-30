import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      //Array with questions and answers which the moderator gets from the store
      questionBank: [
        {
          iths: [
            {
              question: 'Hur högt är Mount Everest i antal meter räknat?',
              correct_answer: 8848
            },
            {
              question: 'Hur många trappsteg är i ITHS trappuppgång?',
              correct_answer: 135
            },
            {
              question: 'Hur högt är Eiffel-tornet i antal meter räknat?',
              correct_answer: 324
            },
            {
              question: 'Hur många kort finns i en vanlig kortlek?',
              correct_answer: 32
            },
            {
              question: 'Hur många dollar tjänar Bill Gates per minut?',
              correct_answer: 23148
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
      // question to be used by playgame
      question: {
        question: null,
        answer: null
      },
    //Players & bots in the active game
    activePlayers: [
      { id: 0, name: "Player", guess: null, image: require("@/assets/sixten.png"), isMyTurn: true, isHuman: true, guesses: 0, slateImage: require("@/assets/slate.png") },
      { id: 1, name: "Grandma", guess: null, image: require("@/assets/grandma.png"), isMyTurn: false, isHuman: false, guesses: 0, slateImage: require("@/assets/slate.png") },
      { id: 2, name: "Pelle", guess: null, image: require("@/assets/bot2.png"), isMyTurn: false, isHuman: false, guesses: 0, slateImage: require("@/assets/slate.png") },
      { id: 3, name: "Wall-E", guess: null, image: require("@/assets/wall-e.png"), isMyTurn: false, isHuman: false, guesses: 0, slateImage: require("@/assets/slate.png") },
    ],
    scoreBoard: [
      { name: "Ilari", guesses: 3 },
      { name: "Joel", guesses: 2 },
      { name: "Tonny", guesses: 5 },
      { name: "Elin", guesses: 3 },
      { name: "Martin", guesses: 6},
      { name: "Bob", guesses: 4 },
    ],
    //This is the guess of players/bots, and moderator will get this number
    guessNumber: null,
    //If moderator says that the guess is too low, then it will become lowestNumber
    lowestNumber: 0,
    //If moderator says that the guess is too high, then it will become highestNumber
    highestNumber: 10000,
    //A boolean value to show or not show the modal box (winnerBox) when someone guessed correctly
    isWinnerBoxVisible: false,
    showRules: false,
    seconds: 10,
    round: 1,

    // Martin test
    gameState: true,
    correctGuess: 8848,
    moderatorAnswer: null,
    disableInputButton: false,

  },
  mutations: {
      /*
        Following some functions to reset several states when called upon.
      */
      //This enables the gameState again when questions are submitted from the StarMenu.
      defaultGameState(state) {
        state.gameState = true;
      },
      //This resets the guess of each player in the activePlayers to null.
      defaultActivePlayersGuess(state) {
        var players = state.activePlayers;

        for(var i = 0; i < players.length; i++) {
          players[i].guess = null;
        }
      },
      //This resets the state of isMyTurn so that bots have false and the player has true.
      defaultActivePlayersMyTurn(state) {
        var players = state.activePlayers;

        for(var i = 0; i < players.length; i++) {
          if(players[i].isHuman == true) {
            players[i].isMyTurn = true;
          }
          else {
            players[i].isMyTurn = false;
          }
        }
      },
      //This function resets states which is required to keep scores and being able to replay game.
      defaultStates(state) {
        state.lowestNumber = 0;
        state.highestNumber = 10000;
        state.round = 1;
        state.guessNumber = null;
        state.isWinnerBoxVisible = false;
        state.question.question = null;
        state.question.answer = null;
        state.moderatorAnswer = null;
        state.disableInputButton = false;
      },

    updateModeratorAnswer(state) {
      if (state.guessNumber < state.question.answer) {
        state.moderatorAnswer = "The guess is too low!"
        this.dispatch('resetModeratorTalk')
      }
      else if (state.guessNumber > state.question.answer) {
        state.moderatorAnswer = "The guess is too high!"
        this.dispatch('resetModeratorTalk')
      }
      else if (state.guessNumber == state.question.answer) {
        state.moderatorAnswer = "The guess is correct!"
        state.gameState = false;
        this.dispatch('showResult')
      }
    },

    toggleInputButton(state){
      state.disableInputButton = !state.disableInputButton;
    },

    resetModeratorTalk(state) {
      state.moderatorAnswer = null;
    },

    resetPlayersGuess(state) {
      for (let i = 0; i < state.activePlayers.length; i++) {
        state.activePlayers[i].guess = null;
      }
    },

    submitGuessToStore(state, player) {
      state.activePlayers[player.id].guess = player.guess;
      if ((player.guess < state.question.answer && player.guess > state.lowestNumber) || (player.guess < state.question.answer && state.lowestNumber == null)) {
        state.lowestNumber = player.guess;
      }
      else if ((player.guess > state.question.answer && player.guess < state.highestNumber) || (player.guess > state.question.answer && state.highestNumber == null)) {
        state.highestNumber = player.guess;
      }
    },

    delayModeratorAnswer() {
      this.dispatch('delayModeratorAnswer')
    },

    seeWhosTurn(state, player) {
      if (state.gameState == true) {
        this.dispatch('delaySwitchTurn', player)
      }
    },

    //This function pushes the player into the "activePlayers array"
    addToActivePlayers: function (state, payload) {
      state.activePlayers.push(payload);
    },
    //Changes the value of lowestNumber if payload is larger
    setLowestNumber: function (state, payload) {
      if (payload > state.lowestNumber) {
        state.lowestNumber = payload;
      }

     },

    //changes the value of highestNumber if payload is lesser
    setHighestNumber: function (state, payload) {
      if (payload < state.highestNumber) {
        state.highestNumber = payload;
      }
    },
    //close modal box
    closeWinnerBox: function (state) {
      state.isWinnerBoxVisible = false;
    },
    //open modal box
    openWinnerBox: function (state) {
      state.isWinnerBoxVisible = true;
    },
    //changes the guessNumber
    updateLastGuess(state, guess) {
      state.guessNumber = guess;
    },
    //changes the active players turn
    switchTurn(state, player) {
      if (state.gameState == true) {
        if (state.activePlayers[player.id].id == state.activePlayers.length - 1) {
          state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
          state.activePlayers[0].isMyTurn = !state.activePlayers[0].isMyTurn;
          state.round++;
          state.disableInputButton = !state.disableInputButton;
        } else {
          state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
          state.activePlayers[player.id + 1].isMyTurn = !state.activePlayers[player.id + 1].isMyTurn;
        }
      }


      // check if it is a bot's turn. If true - the "makeBotDecision" method runs
      for (let i = 0; i < state.activePlayers.length; i++) {
        if (state.activePlayers[i].isMyTurn == true && state.activePlayers[i].isHuman == false) {
          this.dispatch('makeBotDecision', state.activePlayers[i])
        }
      }
    },

    showRules(state) {
      state.showRules = !state.showRules;
    },

    setSeconds(state, nr) {
      state.seconds = nr;
    },

    //Resets round to 1
    resetRound: (state) => {
      state.round = 1;
    },
    //Adds +1 to guesses in active players
    addGuesses(state) {
      state.activePlayers.guesses++;
    },

    // gets playerName from StartMenu
    assignPlayerName(state, playerName) {
      if (playerName != null) { // if playerName is null, the name will not change
        state.activePlayers[0].name = playerName; // changes
      }
    },

    // gets selectedQuestion from StartMenu
    assignQuestion(state, selectedQuestion) {
      // sets question and answer
      state.question.question = selectedQuestion.question;
      state.question.answer = selectedQuestion.correct_answer;

      //Sets the highestNumber that a bot can guess to 2 times the correct answer.
      state.highestNumber = state.question.answer * 2;
    }
  },
  actions: {

    //Martin Test
    resetModeratorTalk(context) {
      setTimeout(function () {
        context.commit("resetModeratorTalk");
        context.commit("resetPlayersGuess");
      }, 1000)
    },

    delaySwitchTurn(context, player) {
      setTimeout(function () {
        context.commit("switchTurn", player);
      }, 3000)
    },

    showResult(context) {
      setTimeout(function () {
        context.commit("openWinnerBox");
      }, 1500)
    },

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
          case 3:
            player.guess = context.state.lowestNumber + (Math.floor(Math.random() * (context.state.highestNumber - context.state.lowestNumber)))
            break;

        }

        context.commit("updateLastGuess", player.guess);
        context.commit("submitGuessToStore", player);
        context.dispatch("delayModeratorAnswer")
          ;
        context.commit("seeWhosTurn", player)

      }, randomTime);

    },

    delayModeratorAnswer(context) {
      setTimeout(function () {
        context.commit("updateModeratorAnswer")
      }, 1000)
    },

         //Timer should be started via playGame
      startSecondCounter(seconds){
        seconds -= 1;

          if (seconds == -1){
            seconds = 10
          }
          return seconds;

      }
    },
})
