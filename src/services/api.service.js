import axios from 'axios';
import AuthService from "./auth.service";
import store from "../store/main.store";
import router from "../router";

const ApiService = {
    API_KEY: process.env.VUE_APP_API_KEY,
    API_URL: process.env.VUE_APP_API_URL,

    getDepartments(search='') {
        return this._getFromMysql(`/departments?filter=(dept_name like ${search}%)`, true)
            .then(response => {
                this.departments = response.data.resource;
                return response.data.resource;
            })
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    getEmployeeById(id) {
        return this._getFromMysql(`/employees/${id}`,  true, 'zip_coordinates_by_zip,departments_by_dept_emp')
            .then(response => response.data)
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    getEmployeesByDeptId(id, search='') {
        return this._getFromMysql(`/departments/${id}`, true, `employees_by_dept_emp&employees_by_dept_emp_filter=(first_name like %${search}%) or (last_name like %${search}%)`)
            .then(response => response.data)
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    getAllEmployeesCount(search='') {
        return this._getFromMysql(`/employees?count_only=true&filter=(first_name like %${search}%) or (last_name like %${search}%)`)
            .then(response => {
                return response.data;
            })
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    getEmployeesWithPagination(pageSize, offset, search='') {
        return this._getFromMysql(`/employees?filter=(first_name like %${search}%) or (last_name like %${search}%)`, true, '', pageSize, offset)
            .then(response => {
                return response.data.resource;
            })
            .catch(e => {
                return this._errorHandler(e);
            })
    },


    getAllCustomersCount() {
        return this._getFromSalesforce('/account?count_only=true')
            .then(response => {
                return response.data;
            })
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    getCustomersWithPagination(pageSize, offset) {
        return this._getFromSalesforce('/account', true, '', pageSize, offset)
            .then(response => {
                return response.data.resource;
            })
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    getCustomerById(id) {
        return this._getFromSalesforce(`/account/${id}`, true)
            .then(response => response.data)
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    getEmployeesWithZipCoordinates() {
        return this._getFromMysql('/employees?fields=emp_no,zip&order=emp_no asc', true, 'zip_coordinates_by_zip&zip_coordinates_by_zip.fields=zip_code,latitude,longitude')
            .then(response => {
                this.employees = response.data.resource;
                return this.employees;
            })
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    getUserById(id) {
        let result = Promise.all([
            this._get(`${this.API_URL}/system/user/${id}`, false),
            this.checkAdmin(id).catch(_ => {store.commit('setIsAdmin', false);})
        ]);
        return result
            .then(([response, isAdmin]) => {
                if(isAdmin.id === id) {
                    store.commit('setIsAdmin', true);
                } else {
                    store.commit('setIsAdmin', false);
                }
                if (!response.data || !response.data.username) {
                    AuthService.logout();
                    return false;
                } else {
                    return response.data;
                }
            })
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    checkAdmin(id) {
        return this._put(`${this.API_URL}/system/user/${id}`, {})
            .then(response => response.data)
            .catch(e => {
              return this._errorHandler(e);
            });
    },

    sendEmail(name, emailAddress, message = '') {

        return this._post(`${this.API_URL}/mailgun/`, {
                "to": [{
                    "name": "Support",
                    "email": process.env.VUE_APP_SUPPORT_EMAIL // add your email here
                }],
                "subject": `Support email from ${emailAddress}`,
                "body_html": `<h2>New support email</h2><p><b>Name:</b> ${name}</p><p><b>Email address:</b> ${emailAddress}</p><p><b>Message:</b> ${message}</p>`,
                "from_name": `${name}`,
                "from_email": `${emailAddress}`,
                "reply_to_name": `${name}`,
                "reply_to_email": `${emailAddress}`
            })
            .then(response => response)
            .catch(e => {
                return this._errorHandler(e);
            });
    },

    editEmployee(id, editedEmployee) {
        return this._patch(`${this.API_URL}/mysql/_table/employees/${id}`, editedEmployee)
            .then(response => response.data)
            .catch(e => {
                console.error(e)
            });
    },

    getNewestEmployees() {
      return this._getFromMysql(`/employees?order=hire_date desc`, true, '', 20)
          .then(response => response.data.resource)
          .catch(e => {
                return this._errorHandler(e);
          });
    },


    // PRIVATE

    _post(url, data) {
        return axios.post(url, data, {
            dataType: 'json',
                headers: this._getApiHeaders()
        });
    },

    _put(url, data) {
        return axios.put(url, data, {
            dataType: 'json',
            headers: this._getApiHeaders()
        });
    },

    _patch(url, data) {
        return axios.patch(url, data, {
            dataType: 'json',
            headers: this._getApiHeaders()
        });
    },

    _get(url, withLoading=false) {
        if (withLoading) this._setLoading(true);


      return axios.get(url, {
            dataType: 'json',
            headers: this._getApiHeaders()
        })
            .then(response => {
                if (withLoading) this._setLoading(false);
              return response
            });
    },

    _getFromMysql(url, withLoading, related = '', limit = '', offset = '') {
        return this._get(`${this.API_URL}/${process.env.VUE_APP_MYSQL_NAMESPACE}/_table${url}${url.includes('?') ? '&' : '?'}limit=${limit}&offset=${offset}&related=${related}`, withLoading);
    },

    _getFromSalesforce(url, withLoading, related = '', limit = '', offset = '') {
        return this._get(`${this.API_URL}/${process.env.VUE_APP_SALESFORCE_NAMESPACE}/_table${url}${url.includes('?') ? '&' : '?'}limit=${limit}&offset=${offset}&related=${related}`, withLoading);
    },

    _getApiHeaders() {
        return {
            'X-DreamFactory-API-Key': this.API_KEY,
            'X-DreamFactory-Session-Token': AuthService.getToken()
        }
    },

    _errorHandler(error) {
      this._setLoading(false);

      switch (error.response.status) {
            case 404:
                router.push({name: 'pageNotFound'}).catch(err => {});
                break;
            case 401:
                router.push({name: 'login'}).catch(err => {});
                AuthService.logout();
                break;
            case 500:
                router.push({name: 'somethingWentWrongPage'}).catch(err => {});
                break;
        }
        return error;
    },

    _setLoading(state = false) {
      store.commit('setLoading', state);
    }
};


export default ApiService;
