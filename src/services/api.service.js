import axios from 'axios';
import AuthService from "./auth.service";
import store from "../store/main.store";
import router from "../router";

const ApiService = {
    API_KEY: 'ff53688348ae43bfab920d08dd7bbe1379b63dba31f7067b840b77d094ac0e2c',
    API_URL: 'http://excel.staging-spg.dreamfactory.com/api/v2',

    getDepartments() {
        return this._getFromMysql('/departments', true)
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

    getEmployeesByDeptId(id) {
        return this._getFromMysql(`/departments/${id}`, true, 'employees_by_dept_emp')
            .then(response => response.data)
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    getAllEmployeesCount() {
        return this._getFromMysql('/employees?count_only=true')
            .then(response => {
                return response.data;
            })
            .catch(e => {
                return this._errorHandler(e);
            })
    },

    getEmployeesWithPagination(pageSize, offset) {
        return this._getFromMysql('/employees', true, '', pageSize, offset)
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
        return this._get(`${this.API_URL}/system/user/${id}`, false)
            .then(response => {
                if (!response.data || !response.data.username) {
                    AuthService.logout();
                    return false;
                }
                else {
                    this.checkAdmin(id)
                        .then(r => {
                            if(r.id === id) {
                                store.commit('setIsAdmin', true);
                            }
                        })
                        .catch(_ => {
                            store.commit('setIsAdmin', false);
                        });
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
            .catch();
    },

    sendEmail(name, emailAddress, message = '') {

        return this._post(`${this.API_URL}/mailgun/`, {
                "to": [{
                    "name": "Support",
                    "email": "your@email.com" // add your email here
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
        return this._get(`${this.API_URL}/mysql/_table${url}${url.includes('?') ? '&' : '?'}limit=${limit}&offset=${offset}&related=${related}`, withLoading);
    },

    _getFromSalesforce(url, withLoading, related = '', limit = '', offset = '') {
        return this._get(`${this.API_URL}/salesforce/_table${url}${url.includes('?') ? '&' : '?'}limit=${limit}&offset=${offset}&related=${related}`, withLoading);
    },

    _getApiHeaders() {
        return {
            'X-DreamFactory-API-Key': this.API_KEY,
            'X-DreamFactory-Session-Token': AuthService.getToken()
        }
    },

    _errorHandler(error) {
      console.error(error);
      this._setLoading(false);

      switch (error.response.status) {
            case 404:
                router.push({name: 'pageNotFound'});
                break;
            case 401:
                router.push({name: 'login'});
                AuthService.logout();
                break;
            case 500:
                router.push({name: 'somethingWentWrongPage'});
                break;
        }
        return error;
    },

    _setLoading(state = false) {
      store.commit('setLoading', state);
    }
};


export default ApiService;
