
import axios from 'axios';
import { toast } from "react-toastify"

import ERROR_MESSAGE from './../config/errorMessages';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8081/"
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = ERROR_MESSAGE.GENERIC_ERROR
        if (error.response) {
            const { status } = error.response
            message = ERROR_MESSAGE[status] || ERROR_MESSAGE.GENERIC_ERROR;
        } else if (error.request) {
            message = ERROR_MESSAGE.REQUEST_ERROR
        }
        else {
            message = ERROR_MESSAGE.NETWORK_ERROR;
        }
        toast.error(message)
        return Promise.reject(new Error(message));
    }
)

export default axiosInstance
