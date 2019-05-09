import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.store({
    state: {
        // data1: 10,
        // data2: 8
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