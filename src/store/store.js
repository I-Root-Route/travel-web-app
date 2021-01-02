import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userName: "",
        countryCurrencies: ["USD"],
        visitedCountry: "",
        visitedState: "",
        dates: [],
        totalCost: 0,
        selectedCurrency: "USD",
    },
    mutations: {
        updateUser(state, user) {
            state.userName = user.userName;
        }
    },
    actions: {
        auth(context, user) {
            context.commit('updateUser', user);
        }
    },
    modules: {},
})

export default store