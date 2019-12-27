const PaginateService = {

    pageSize: 25,

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
