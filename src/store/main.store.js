import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        header: 'Header',
        departments: [],
        mapEmployees: [],
    },
    getters: {
        getHeader(state) {
            return state.header;
        },

        getDepartments(state) {
            return state.departments;
        },

        getEmployeesForMap(state) {
            return state.mapEmployees;
        }
    },
    mutations: {
        setHeader(state, header) {
            state.header = header;
        },

        setDepartments(state, departments) {
            state.departments = departments;
        },

        setEmployeesForMap(state, employees) {
            state.mapEmployees = employees;
        },
    },
    actions: {

    }
});

export default store;
