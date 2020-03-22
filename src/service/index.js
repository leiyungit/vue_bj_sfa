import axios from "axios";

// 请求拦截器 https://www.npmjs.com/package/axios
let axiosIns = axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let loginToken = sessionStorage.getItem("LoginToken");
    if (loginToken) {
        config.headers.Authorization = `Bearer ${loginToken}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default {
    login(data) {
        return axios.post("/api/login", data);
    },
    logout() {
        // 退出登录时，取消依赖
        return axios.interceptors.request.eject(axiosIns);
    },
    getUserProgress() {
        return axios.get("/api/getUserProgress");
    },
    getMenuList(){
        return axios.get("/indexMenu.json");
    }
}