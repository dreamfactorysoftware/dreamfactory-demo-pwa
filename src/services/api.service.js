import axios from 'axios';
import AuthService from "./auth.service";
import store from "../store/main.store";

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
                console.error(e)
            })
    },

    getEmployeeById(id) {
        return this._getFromMysql(`/employees/${id}`,  true, 'zip_coordinates_by_zip')
            .then(response => response.data)
            .catch(e => {
                console.error(e)
            })
    },

    getEmployeesByDeptId(id) {
        return this._getFromMysql(`/departments/${id}`, true, 'employees_by_dept_emp')
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
        return this._getFromMysql('/employees', true, '', pageSize, offset)
            .then(response => {
                return response.data.resource;
            })
            .catch(e => {
                console.error(e)
            })
    },


    getAllCustomersCount() {
        return this._getFromSalesforce('/account?count_only=true')
            .then(response => {
                return response.data;
            })
            .catch(e => {
                console.error(e)
            })
    },

    getCustomersWithPagination(pageSize, offset) {
        return this._getFromSalesforce('/account', true, '', pageSize, offset)
            .then(response => {
                return response.data.resource;
            })
            .catch(e => {
                console.error(e)
            })
    },

    getCustomerById(id) {
        return this._getFromSalesforce(`/account/${id}`, true)
            .then(response => response.data)
            .catch(e => {
                console.error(e)
            })
    },

    getEmployeesWithZipCoordinates() {
        return this._getFromMysql('/employees', true, 'zip_coordinates_by_zip')
            .then(response => {
                this.employees = response.data.resource;
                return this.employees;
            })
            .catch(e => {
                console.error(e)
            })
    },

    getUserById(id) {
        return this._get(`${this.API_URL}/system/user/${id}`, false)
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
            .catch(e => console.error(e));
    },


    // PRIVATE

    _post(url, data) {
        return axios.post(url, data, {
            dataType: 'json',
                headers: this._getApiHeaders()
        });
    },

    _get(url, withLoading=false) {
        if (withLoading) store.commit('setLoading', true);

        return axios.get(url, {
            dataType: 'json',
            headers: this._getApiHeaders()
        })
            .then(response => {
                if (withLoading) store.commit('setLoading', false);
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
    }
};

export default ApiService;
