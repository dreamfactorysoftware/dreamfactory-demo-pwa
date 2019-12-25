import axios from "axios";
import ApiService from "./api.service";


const AuthService = {

    setToken(token) {
        localStorage.setItem('jwt', token);
    },

    getToken() {
        return localStorage.getItem('jwt');
    },

    getPayload(jwt) {
        try {
            let payload = JSON.parse(atob(jwt.split('.')[1]));
            return this.getUserById(payload.user_id);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    },

    getUserById(id) {
        return axios.get(`http://excel.staging-spg.dreamfactory.com/api/v2/system/user/${id}`, {
            dataType: 'json',
            headers: {
                'X-DreamFactory-API-Key': ApiService.API_KEY,
                'X-DreamFactory-Session-Token': ApiService.SESSION_TOKEN
            }
        })
            .then(response => {
                if (!response.data || !response.data.username) {
                    this.logout();
                    return false;
                }
                return response.data;
            })
            .catch(e => {
                console.error(e)
            })
    },

    logout() {
        localStorage.removeItem('jwt');
    }



};

export default AuthService;
