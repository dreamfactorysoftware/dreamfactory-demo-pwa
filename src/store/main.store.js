import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        header: 'Header'
    },
    getters: {
        getHeader(state) {
            return state.header;
        }
    },
    mutations: {
        setHeader(state, header) {
            state.header = header;
        }
    },
    actions: {

    }
});

export default store;
