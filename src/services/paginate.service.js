import ApiService from "./api.service";


const PaginateService = {

    pageSize: 25,

    getEmployeesForPage(pageNumber) {
        return ApiService.getEmployeesWithPagination(this.pageSize, this.pageSize * (pageNumber-1));
    },

    getPageSize() {
        return this.pageSize;
    },

    getOffset(pageNumber) {
        return this.pageSize * (pageNumber-1);
    },

    getDeptEmployeesForPage(employees, pageNumber) {
        return employees.slice(this.pageSize * (pageNumber-1), this.pageSize * (pageNumber));
    }


};

export default PaginateService;
