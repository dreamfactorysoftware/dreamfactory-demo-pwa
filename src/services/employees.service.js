import ApiService from "./api.service";

const EmployeesService = {


    async getEmployeesByDepartmentId(departmentId) {
        const deptEmployees = await ApiService.getDeptEmployees();

        // from dept_emp table
        const deptEmployeesByDepartmentId = deptEmployees.filter(({dept_no}) => dept_no === departmentId);

        // from employees table
        const employees = await ApiService.getEmployees();

        let employeesByDepartmentId = [];

        for (let employee of employees) {
            for (let deptEmployee of deptEmployeesByDepartmentId) {
                if (employee.emp_no === deptEmployee.emp_no) {
                    employeesByDepartmentId.push(employee);
                }
            }
        }

        return employeesByDepartmentId;
    }


};

export default EmployeesService;
