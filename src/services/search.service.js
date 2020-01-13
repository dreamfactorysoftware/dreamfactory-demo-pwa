import store from "../store/main.store";
import ApiService from "./api.service";
import PaginateService from "./paginate.service";

const SearchService = {

    searchHandler(route, query) {
      if(query === '') {
        store.commit('setSearch', {empty: true, searchResult: [], query: query});
        return;
      }

      switch (route.name) {
        case 'employees':{
          let page = route.query.page;
          let pageCount = 0;
          ApiService.getAllEmployeesCount(query)
              .then(count => {
                pageCount = Math.floor(count / PaginateService.getPageSize());
                page = PaginateService.validatePageNumber(route, page, pageCount);
                return ApiService.getEmployeesWithPagination(PaginateService.getPageSize(), PaginateService.getOffset(page), query)
              })
              .then( result => {
                store.commit('setSearch', {empty: false, searchResult: result, query: query, count: pageCount});
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
          ApiService.getEmployeesByDeptId(route.params.id, query).then((dept)=> {
            store.commit('setSearch',
                { empty: false,
                  searchResult: dept.employees_by_dept_emp.hasOwnProperty('resource') ? dept.employees_by_dept_emp.resource : dept.employees_by_dept_emp,
                  query: query
                });
          });
          break;
        }
        default:{
          store.commit('setSearch', {empty: true, searchResult: [], query: query});
          break;
        }
      }
    },

    clearSearch() {
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
