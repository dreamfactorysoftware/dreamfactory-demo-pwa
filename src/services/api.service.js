import axios from 'axios';
import AuthService from "./auth.service";

const ApiService = {
    departments: [],
    employees: [],

    API_KEY: 'ff53688348ae43bfab920d08dd7bbe1379b63dba31f7067b840b77d094ac0e2c',
    API_URL: 'http://excel.staging-spg.dreamfactory.com/api/v2',
    MYSQL_API_URL: 'http://excel.staging-spg.dreamfactory.com/api/v2/mysql/_table',

    getDepartments() {
        if (this.departments.length > 0) {
            return this.departments
        } else {
            return this._getFromMysql('/departments')
                .then(response => {
                    this.departments = response.data.resource;
                    return response.data.resource;
                })
                .catch(e => {
                    console.error(e)
                })
        }
    },

    getEmployeeById(id) {
        return this._getFromMysql(`/employees/${id}`, 'zip_coordinates_by_zip')
            .then(response => response.data)
            .catch(e => {
                console.error(e)
            })
    },

    getEmployeesByDeptId(id) {
        return this._getFromMysql(`/departments/${id}`, 'employees_by_dept_emp')
            .then(response => response.data)
            .catch(e => {
                console.error(e)
            })
    },

    getAllEmployeesCount() {
        return this._getFromMysql('/employees?count_only=true')
            .then(response => {
                return response.data;
            })
            .catch(e => {
                console.error(e)
            })
    },

    getEmployeesWithPagination(pageSize, offset) {
        return this._getFromMysql('/employees', '', pageSize, offset)
            .then(response => {
                return response.data.resource;
            })
            .catch(e => {
                console.error(e)
            })
    },

    getEmployeesWithZipCoordinates() {
        if (this.employees.length > 0) {
            return this.employees
        } else {
            return this._getFromMysql('/employees', 'zip_coordinates_by_zip')
                .then(response => {
                    this.employees = response.data.resource;
                    return this.employees;
                })
                .catch(e => {
                    console.error(e)
                })
        }
    },

    getUserById(id) {
        return this._get(`${this.API_URL}/system/user/${id}`)
            .then(response => {
                if (!response.data || !response.data.username) {
                    AuthService.logout();
                    return false;
                }
                return response.data;
            })
            .catch(e => {
                console.error(e)
            })
    },

    // PRIVATE

    _get(url) {
        return axios.get(url, {
            dataType: 'json',
            headers: {
                'X-DreamFactory-API-Key': this.API_KEY,
                'X-DreamFactory-Session-Token': AuthService.getToken()
            }
        });
    },

    _getFromMysql(url, related = '', limit = '', offset = '') {
        let hasQuestionMark = url.includes('?');
        return axios.get(`${this.MYSQL_API_URL}${url}${hasQuestionMark ? '&' : '?'}limit=${limit}&offset=${offset}&related=${related}`, {
            dataType: 'json',
            headers: {
                'X-DreamFactory-API-Key': this.API_KEY,
                'X-DreamFactory-Session-Token': AuthService.getToken()
            }
        });
    }

};

export default ApiService;
