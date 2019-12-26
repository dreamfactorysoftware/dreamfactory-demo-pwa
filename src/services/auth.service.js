import ApiService from "./api.service";


const AuthService = {

    setToken(token) {
        localStorage.setItem('jwt', token);
    },

    getToken() {
        return localStorage.getItem('jwt') | '';
    },

    getPayload(jwt) {
        try {
            let payload = JSON.parse(atob(jwt.split('.')[1]));
            return ApiService.getUserById(payload.user_id);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    },

    logout() {
        localStorage.removeItem('jwt');
    }



};

export default AuthService;
