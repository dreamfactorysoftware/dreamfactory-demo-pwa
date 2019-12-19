import ApiService from "./api.service";


const PaginateService = {

    pageSize: 25,

    getEmployeesForPage(pageNumber) {
        return ApiService.getEmployeesWithPagination(this.pageSize, this.pageSize * (pageNumber-1));
    }


};

export default PaginateService;
