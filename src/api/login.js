import base from './base';

const LoginApi = {
    getCode() {
        return base.get("/api/users/code");
    },
    login(data) {
        return base.post("/api/users/login", data)
    }
}
export default LoginApi;