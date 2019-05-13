import Vue from 'vue'
import Vuex from 'vuex'

//images
import kalleAsset from "../assets/kalle.jpg";
import kajsaAsset from "../assets/kajsa.jpg";
import martinAsset from "../assets/martin.jpg";

Vue.use(Vuex);

export const store = new Vuex.Store({
    //Prevents changes in components without store involvement
    strict: true,
    state: {
      //Array with questions and answers which the moderator gets from the store
      questionBank: [
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
      ],
      //Array with bots
      bots: [
        {
          id: 1,
          name: 'RoboCop',
          image: kalleAsset
        },
        {
          id: 2,
          name: 'Terminator',
          image: martinAsset
        },
      ],
      //Players & bots in the active game
      activePlayers: [
        {
          id: 0,
          name: 'Player',
          image: kajsaAsset
        },
        {
          id: 1,
          name: 'Robocop',
          image: kalleAsset
        },
        {
          id: 2,
          name: 'Terminator',
          image: martinAsset
        }
      ],
      //This is the guess of players/bots, and moderator will get this number
      guessNumber: 0,
      //If moderator says that the guess is too low, then it will become lowestNumber
      lowestNumber: 0,
      //If moderator says that the guess is too high, then it will become highestNumber
      highestNumber: 0
    },
    getters: {

        // totalData: state => {
        // let totalData = state.data1 + state.data2;
        // return totalData;
        // }
    },
    mutations: {
      //This function pushes the player into the "activePlayers array"
        addToActivePlayers: function(state, payload) {
          state.activePlayers.push(payload);
        }
    },
    actions: {
        // increaseDataOne: context => {
        // setTimeout(function() {
        // context.commit('increaseDataOne')
        // }, 2000)
        // })
    }
})
