import router from "../router"

const PaginateService = {

    currentPage: 1,
    pageSize: 25,

    getPageSize() {
        return this.pageSize;
    },

    getCurrentPage() {
        return this.currentPage;
    },

    getOffset(pageNumber) {
        return this.pageSize * (pageNumber-1);
    },

    getDeptEmployeesForPage(employees, pageNumber) {
        if (employees.hasOwnProperty('resource')) {
            employees = employees.resource;
        }

        return employees.slice(this.pageSize * (pageNumber-1), this.pageSize * (pageNumber));
    },

    validatePageNumber(route, pageNumber, count=0) {
        let isEmptyPage = typeof pageNumber === 'undefined' || !pageNumber;

        if(isEmptyPage || pageNumber <= 0 || !Number.isInteger(parseInt(pageNumber)) || (count !== 0 && count < pageNumber)) {
          this.currentPage = 1;
          router.push({ name: route.name, query: { ...route.query, page: 1 }}).catch(err => {});
          return 1;
        }

        this.currentPage = pageNumber;
        router.push({ name: route.name, query: { ...route.query, page: pageNumber }}).catch(err => {});
        return pageNumber;
    }
};

export default PaginateService;
