import Vue from 'vue'
import Vuex from 'vuex'


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
        question: 'Hur högt är Mount Everest i antal meter räknat?',
        answer: 8848
      },
    //Players & bots in the active game
    activePlayers: [
      { id: 0, name: "Kalle", guess: null, image: require("@/assets/sixten.png"), isMyTurn: true, isHuman: true, guesses: 0, slateImage: require("@/assets/slate.png") },
      { id: 1, name: "Grandma", guess: null, image: require("@/assets/grandma.png"), isMyTurn: false, isHuman: false, guesses: 0, slateImage: require("@/assets/slate.png") },
      { id: 2, name: "Pelle", guess: null, image: require("@/assets/bot2.png"), isMyTurn: false, isHuman: false, guesses: 0, slateImage: require("@/assets/slate.png") },
      { id: 3, name: "Wall-E", guess: null, image: require("@/assets/wall-e.png"), isMyTurn: false, isHuman: false, guesses: 0, slateImage: require("@/assets/slate.png") },
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
    time:10,
    //PlayGame use this
    i:0,
    
    timer:null,
    test:null,

  },
  
  mutations: {

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
    submitGuessToStore(state, highLow) {
      console.log("Enter submit guessGuessToStore with value: "+highLow);
      
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

    //This function pushes the player into the "activePlayers array"
    addToActivePlayers: function (state, payload) {
      state.activePlayers.push(payload);
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
          if (state.activePlayers[player.id].id == state.activePlayers.length - 1) {
            console.log("Enter if inside switchTurn with player.id: "+player.id);
            state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
            state.activePlayers[0].isMyTurn = !state.activePlayers[0].isMyTurn;
            state.i=0;
            state.round++;
            state.toggleInputButton=!state.toggleInputButton;
            

          } else {
            console.log("Enter else inside switchTurn with player.id: "+player.id);
            state.activePlayers[player.id].isMyTurn = !state.activePlayers[player.id].isMyTurn;
            state.activePlayers[player.id + 1].isMyTurn = !state.activePlayers[player.id + 1].isMyTurn;
            state.i++
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
    assignPlayerName(state, playerName) {
          if (playerName != null) {
            state.activePlayers[0].name = playerName;
          }
        },
        assignQuestion(state, selectedQuestion) {
          state.question.question = selectedQuestion.question;
          state.question.answer = selectedQuestion.correct_answer;
        }
        
        
  },
  actions: {

    //Martin Test
    resetModeratorTalk(context) {
      setTimeout(function () {
        context.commit("updateModeratorAnswer","");
        
      }, 1000)
    },

    showResult(context) {
      setTimeout(function () {
        context.commit("openWinnerBox");
      }, 500)
    },
    playGame(context){
      
      
      var player=context.state.activePlayers[context.state.i];
      console.log("Enter game with player.id: "+player.id);
      
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
          console.log("Enter userMethod with player.id: "+player.id);
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
        
      } else if (context.state.guessNumber < context.state.question.answer) {
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
      
      
      //skicka antal gissningar till player[] ????
      
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
