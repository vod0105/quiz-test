import axios from "axios";
import {store} from "../redux/store"
const instance = axios.create({
    baseURL: 'http://localhost:8888/mobile/',
    timeout: 10000, // Thời gian chờ (tùy chọn)
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    console.log('check data store: ',store.getState())
    const access_token = store?.getState()?.user?.account?.access_token;
    if (access_token) {
        // console.log("acc",access_token)
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response &&  response.data ? response.data : response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;