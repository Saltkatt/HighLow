import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      //Array med frågor och svar som hämtas av moderatorn
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
      //Botar som ska hämtas ifrån bot-componen
      botar: [
        {
          id: 1,
          name: 'RoboCop',
        },
        {
          id: 2,
          name: 'Terminator',
        },
      ],
    },
    getters: {
        // totalData: state => {
        // let totalData = state.data1 + state.data2;
        // return totalData;
        // }
    },
    mutations: {
        // increaseDataOne: state => {
        // state.dataOne++;
        // }
    },
    actions: {
        // increaseDataOne: context => {
        // setTimeout(function() {
        // context.commit('increaseDataOne')
        // }, 2000)
        // })
    }
})
