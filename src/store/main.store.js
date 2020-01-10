import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        header: 'Header',
        loading: false,
        departments: [],
        employees: [],
        search: {
            empty: true,
            count: 0,
            query: '',
            searchResult: [],
        },
        mapEmployees: [],
        newestEmployees: [],
        isAdmin: false,
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

        getEmployees(state) {
            return state.employees;
        },

        getEmployeesForMap(state) {
            return state.mapEmployees;
        },

        getNewestEmployees(state) {
          return state.newestEmployees;
        },

        getIsAdmin(state) {
          return state.isAdmin;
        },

        getSearch(state) {
          return state.search;
        },
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

        setEmployees(state, employees) {
            state.employees = employees;
        },

        setSearch(state, search) {
            state.search = search;
        },

        setEmployeesForMap(state, employees) {
            state.mapEmployees = employees;
        },

        setNewestEmployees(state, employees) {
            state.newestEmployees = employees;
        },

        setIsAdmin(state, isAdmin) {
            state.isAdmin = isAdmin;
        },
    },
    actions: {

    }
});

export default store;
