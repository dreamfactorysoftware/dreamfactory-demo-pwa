import store from "../store/main.store";
import router from "../router";
import ApiService from "./api.service";
import PaginateService from "./paginate.service";

const SearchService = {

    searchHandler(route, query) {
      router.push({ query: { ...route.query, search: query }}).catch(err => {});
      if(query === '') {
        store.commit('setSearch', {empty: true, searchResult: [], query: query});
        return;
      }

      switch (route.name) {
        case 'employees':{
          let dataPromise = ApiService.getEmployeesWithPagination(PaginateService.getPageSize(), PaginateService.getOffset(route.query.page), query);
          let countPromise = ApiService.getAllEmployeesCount(query);

          Promise.all([countPromise, dataPromise]).then(([count, data]) => {
            let pageCount = Math.floor(count / PaginateService.getPageSize());
            store.commit('setSearch', {empty: false, searchResult: data, query: query, count: pageCount});
          });
          break;
        }
        case 'departments':{
          ApiService.getDepartments(query).then((depertments)=> {
            store.commit('setSearch', {empty: false, searchResult: depertments, query: query});
          });
          break;
        }
        case 'department': {
          ApiService.getEmployeesByDeptId(route.params.id, query).then((employees)=> {
            store.commit('setSearch', {empty: false, searchResult: employees, query: query});
          });
          break;
        }
        default:{
          store.commit('setSearch', {empty: true, searchResult: [], query: query});
          break;
        }
      }
    },

    clearSearchList() {
        store.commit('setSearch', {empty: true, searchResult: [], query: ''});
    },

    debounce(func, wait, immediate) {
      var timeout;

      return function executedFunction() {
        var context = this;
        var args = arguments;

        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
      };
    },
};

export default SearchService;