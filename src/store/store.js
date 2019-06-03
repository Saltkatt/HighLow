import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';


Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {

      //Array with questions and answers which the moderator gets from the store
      questionBank: [
        {
          iths: [
            {
              question: 'How high is Mount Everest in meters?',
              correct_answer: 8848
            },
            {
              question: 'How many stairs are there from the ground level to ITHS floor level?',
              correct_answer: 135
            },
            {
              question: 'How tall is the Eiffel Tower in meters?',
              correct_answer: 324
            },
            {
              question: 'How many cards are there in an average deck?',
              correct_answer: 52
            },
            {
              question: 'How many dollars does Bill Gates make per minute?',
              correct_answer: 23148
            },
            {
              question: 'What year was Sputnik 1 launched into orbit around Earth?',
              correct_answer: 1957
            },
            {
              question: 'How long is a martian year?',
              correct_answer: 687
            },
            {
              question: 'How many arms does an octopus have?',
              correct_answer: 6
            },
            {
              question: 'How many kW is 500 horse powers?',
              correct_answer: 670
            },
            {
              question: 'How many episodes does the Game of Thrones TV-series have?',
              correct_answer: 73
            }
          ]
        }
      ],

      //Array with bots
      bots: [
        {
          id: 1,
          name: "Grandma",
          guess: null,
          image: require("@/assets/grandma.png"),
          isMyTurn: false,
          isHuman: false,
          slateImage: require("@/assets/slate.png"),
          selected: false, //is bot selected by user to compete
          description: "Confused"
        },
        {
          id: 2,
          name: "Pelle",
          guess: null,
          image: require("@/assets/bot2.png"),
          isMyTurn: false,
          isHuman: false,
          slateImage: require("@/assets/slate.png"),
          selected: false, //is bot selected by user to compete
          description: "Shoots from the hip!"
        },
        {
          id: 3,
          name: "Wall-E",
          guess: null,
          image: require("@/assets/wall-e.png"),
          isMyTurn: false,
          isHuman: false,
          slateImage: require("@/assets/slate.png"),
          selected: false, //is bot selected by user to compete
          description: "Pratically Perfect!"
        },
      ],

      //avatars
      avatars: [
        {
          id: 1,
          image: require("@/assets/avatar1.png"),
          name: "Dragon",
          selected: true,
        },
        {
          id: 2,
          image: require("@/assets/avatar2.png"),
          name: "Elfo",
          selected: false,
        },
        {
          id: 3,
          image: require("@/assets/avatar3.png"),
          name: "Hombre",
          selected: false,
        },
      ],

      // question to be used by playgame
      question: {
        question: null,
        answer: null
      },
    //Players & bots in the active game
    activePlayers: [],
    
    //Hard-coded Scoreboard
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
    highestNumber: 30000,
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
    time:10,
    //PlayGame use this
    i:0,

    timer:null,
    test:null,

  },

  mutations: {
      
      //toggle avatar selection
        toggleAvatar: function (state, avatarId) {
        for(let i= 0; i < state.avatars.length; i++){
        state.avatars[i].selected = false;
      }
      state.avatars[avatarId-1].selected = !state.avatars[avatarId-1].selected;
    },

    //toggle avatar selection
    toggleAvatar: function (state, avatarId) {
      for(let i= 0; i < state.avatars.length; i++){
        state.avatars[i].selected = false;
      }
      state.avatars[avatarId-1].selected = !state.avatars[avatarId-1].selected;
    },

    //reset active players list
    resetActivePlayers: function (state) {
      // state.activePlayers = [];
      state.activePlayers.length = 0;
    },

    //push player detail into the activePlayers array
    //note: it is assumed the player has id 0
    addToActivePlayers: function (state, payload) {
      state.activePlayers.push(payload);
    },

    //put bots with field "selected" as true into activePlayers
    putSelectedBotsInActivePlayers: function (state) {
      for (var botI=0; botI<state.bots.length; botI++) {
        if (state.bots[botI].selected == true) {
          //Rest state of bots - guess and isMyTurn - to default
          state.bots[botI].guess = null;
          state.bots[botI].isMyTurn = false;
          state.activePlayers.push(state.bots[botI]);
          // alert ("added bot: " + state.bots[botI].name);
        }
        var player = state.activePlayers;
        for(var i = 0; i < player.length; i++) {
        }
      }

    },
    /*
    Following some functions to reset several states when called upon.
    */
   //This enables the gameState again when questions are submitted from the StarMenu.
      defaultGameState(state) {
        state.gameState = true;
      },
      // loadGame(state) {
      //   //Push selected bots into activePlayer
      //   for(let i=0;i<state.bots.length;i++){
      //     if(state.bots[i].selected==true){
      //       state.bots[i].guess = null;
      //       state.bots[i].isMyTurn = null;
      //       state.activePlayers.push(state.bots[i]); //was push("state.bots[i]");
      //     }
      //   }
      // },
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
        state.time = 10;
        state.i = 0;
        state.activePlayers.length = 0;
        state.gameState = true;
        state.guessNumber = null;
        state.isWinnerBoxVisible = false;
        state.question.question = null;
        state.question.answer = null;
        state.moderatorAnswer = null;
        state.disableInputButton = false;
      },

    updateModeratorAnswer(state,talk) {
        state.moderatorAnswer = talk;
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
    //Receives high or low guess
    submitGuessToStore(state, highLow) {
      switch(highLow){
        case "low":
        console.log("Enter Low Sitch");
          if (state.guessNumber>state.lowestNumber){
            state.lowestNumber=state.guessNumber;
          }
          break;
        case "high":
        console.log("Enter high switch");
        if(state.guessNumber<state.highestNumber){
          state.highestNumber=state.guessNumber;
        }
        break;

      }

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
    resetLastGuess(state) {
      state.guessNumber = null;
    },
    //changes the active players turn
    switchTurn(state, player) {

      state.test+="enter switchTurn,"
          player.guess = null;
          if (state.i == state.activePlayers.length - 1) {
            console.log("Enter if inside switchTurn with player.id: "+player.id);
            state.activePlayers[state.i].isMyTurn = !state.activePlayers[state.i].isMyTurn;
            state.activePlayers[0].isMyTurn = !state.activePlayers[0].isMyTurn;
            state.i=0;
            state.round++;
            state.toggleInputButton=!state.toggleInputButton;


          } else {
            console.log("Enter else inside switchTurn with player.id: "+player.id);
            state.activePlayers[state.i].isMyTurn = !state.activePlayers[state.i].isMyTurn;
            state.activePlayers[state.i+1].isMyTurn = !state.activePlayers[state.i + 1].isMyTurn;
            state.i++;
          }
          state.guessNumber=null;


    },

    showRules(state) {
      state.showRules = !state.showRules;
    },

    setGameState(state) {
      state.gameState = !state.gameState;
    },



    increaseTimer(state) {
      state.time--;
    },
    resetTimer(state) {
      state.time=10;
    },

    //Resets round to 1
    resetRound: (state) => {
      state.round = 1;
    },
    //Adds +1 to guesses in active players
    addGuesses(state) {
      state.activePlayers.guesses++;
    },

    addtoTest(state,payload) {
      state.test+=payload;
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
      // state.highestNumber = state.question.answer * 2;
    }

  },
  actions: {

    //Martin Test
    resetModeratorTalk(context) {
      setTimeout(function () {
        context.commit("updateModeratorAnswer","");

      }, 1000)
    },

    //Show winner
    showResult(context) {
      setTimeout(function () {
        context.commit("openWinnerBox");
      }, 500)
    },
    playGame(context){

      var player=context.state.activePlayers[context.state.i];
      console.log("Enter game with player.id: "+player.id + player.name);

      context.dispatch("startTimer");
      //Check if player is human and wait for user input
      if(player.id==0){
        console.log("Players turn, is about to call userMethod with player.id: "+player.id);

        context.dispatch("userMethod", player);


          //Check if player is bot,
          } else if (player.id!==0){
            console.log("bots turn, is about to call makeBotDecision with player.id: "+player.id);

            context.dispatch("makeBotDecision", player);

          }


      },
      userMethod(context,player){
          //console.log("Enter userMethod with player.id: "+player.id);
          // Waits for user-input
        if(context.state.guessNumber==null&&context.state.time>0){ // Lägg in tidparameter här
          setTimeout(function(){
             context.dispatch("userMethod",player);
            },590);

        } else{
          console.log("App is no longer waiting for user-input");
          console.log("is about to send player.guess to updateLastGuess mutation with player.guess: "+player.guess);
          context.commit("updateLastGuess",player.guess);

          context.dispatch("response",player);
        }

      },

    makeBotDecision(context, player) {
      console.log("Enter botDecision with player.id: "+player.id)
          let randomTime = 1000 + Math.floor(Math.random() * 5000);

          setTimeout(function(){

            switch (player.id) {

              case 1:
                //This bots logic: highestNumber - lowestNumber / 2
                player.guess = context.state.lowestNumber + Math.floor((context.state.highestNumber - context.state.lowestNumber) / 2)
                break;
              case 2:
                //This bots logic: highestNumber - lowestNumber * randomNumber
                player.guess = context.state.lowestNumber + (Math.floor(Math.random() * (context.state.highestNumber - context.state.lowestNumber)))
                break;
              case 3:
                //This bots logic: highestNumber - lowestNumber * 10%
                player.guess = context.state.lowestNumber + (Math.floor(
                  (context.state.highestNumber - context.state.lowestNumber) * 0.1))
                break;
            }
            console.log("is about to send player.guess to updateLastGuess mutation with player.guess: "+player.guess);
            context.commit("updateLastGuess",player.guess);
            console.log("is about to call responseMethod with player.id: "+player.id);
            context.dispatch("response",player);

            },randomTime);


    },
    response(context,player){
      console.log("enter responseMethod with player.id: "+player.id);
      context.dispatch("stopTimer");
      console.log("is about to call highLowMethod");
      context.dispatch("highLow");
        if(context.state.gameState){
        setTimeout(function(){
          context.commit("resetModeratorTalk");
           context.commit("resetTimer");
          console.log("is about to call switchTurnMethod with player.id: "+player.id);
          context.commit("switchTurn",player);
          console.log("is about to call playerGame to start over");
          context.dispatch("playGame");
          },2000);
        }



    },

    highLow(context){
      console.log("Enter HighLowMethod, is about to check answer and give response, guessNUumber: "+context.state.guessNumber);

      var respons = null;
      if (context.state.guessNumber == context.state.question.answer) {
        console.log("The answer is correct!");
        respons = "Correct!";
        context.commit("setGameState");
        context.dispatch("showResult");

      } else if (context.state.guessNumber < context.state.question.answer&&context.state.guessNumber!==null) {
        console.log("The answer is too Low!");

        respons = "Too Low";
        console.log("Is about to call submitGuessToStore with value low ");
        // Send data to method submitGuessToStore
        context.commit("submitGuessToStore","low");

      } else if (context.state.guessNumber > context.state.question.answer) {
        respons = "Too High";
        console.log("The answer is too high!");
        // Send data to method submitGuessToStore
        context.commit("submitGuessToStore","high");
      } else if (context.state.guessNumber==null) {
        console.log("The answer is null!");
        respons = "Times up!";

      }
      console.log("IS about to call updateModeratorAnswer with response: "+respons);
      // Send response to moderatoranswer
       setTimeout(function(){
        context.commit("updateModeratorAnswer",respons);
        },600);




      },

    delayModeratorAnswer(context,talk) {
      setTimeout(function () {
        context.commit("updateModeratorAnswer",talk)
      }, 1000)
    },

    startTimer(context){
      console.log("Start timer");

      context.state.timer=setInterval(()=>{
      context.commit("increaseTimer");
     },1000);

    },
    stopTimer(context){
      console.log("Stop Timer");
      clearInterval(context.state.timer);

    },


    }






})
