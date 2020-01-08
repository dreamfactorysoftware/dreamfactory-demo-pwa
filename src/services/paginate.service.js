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
        return employees.slice(this.pageSize * (pageNumber-1), this.pageSize * (pageNumber));
    },

    validatePageNumber(routeName, pageNumber) {
        let isEmptyPage = typeof pageNumber === 'undefined' || !pageNumber;

        if(isEmptyPage || pageNumber < 0 || !Number.isInteger(pageNumber)) {
          this.currentPage = 1;
          router.push({ name: routeName, query: { page: 1 }}).catch(err => {});
          return 1;
        }

        this.currentPage = pageNumber;
        router.push({ name: routeName, query: { page: pageNumber }}).catch(err => {});
        return pageNumber;
    }
};

export default PaginateService;
