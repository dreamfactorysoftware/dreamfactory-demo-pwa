import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        header: 'Header',
        loading: false,
        departments: [],
        mapEmployees: [],
    },
    getters: {
        getHeader(state) {
            return state.header;
        },

        getLoading(state) {
            return state.loading;
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

        setLoading(state, loading) {
            state.loading = loading;
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
