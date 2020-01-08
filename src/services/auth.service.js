import ApiService from "./api.service";
import router from "../router";


const AuthService = {

    setToken(token) {
        localStorage.setItem('jwt', token);
    },

    getToken() {
        return localStorage.getItem('jwt') || '';
    },

    getPayload(jwt) {
        try {
            if (jwt && jwt.split('.')[1]) {
                let payload = JSON.parse(atob(jwt.split('.')[1]));
                return ApiService.getUserById(payload.user_id);
            } else {
                router.push({name: 'login'}).catch(err => {});
                return Promise.resolve(null);
            }
        }
        catch (e) {
            console.error(e);
            router.push({name: 'login'}).catch(err => {});
            return Promise.resolve(null);
        }
    },

    logout() {
        localStorage.removeItem('jwt');
    }



};

export default AuthService;
