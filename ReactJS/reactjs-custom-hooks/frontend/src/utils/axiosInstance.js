
import axios from 'axios';
import { toast } from "react-toastify"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:8081/"
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("Response reveived successfully.");
        return response;
    },
    (error) => {
        let message = "Something went wrong.Please try agin"

        if (error.response) {
            const { status } = error.response

            console.log(`Error status : ${status}`)

            if (status === 404) {
                console.log("Unauthorized access dected, redirecting to login")
                message = "You are not authorized to view this resource.Please login"
            } else if (status === 403) {
                console.log("Access forbidden for this resource.")
                message = "You do not have permission to perform this action"
            } else if (status === 500) {
                console.log("Server error encountered")
                message = "Network error, unable to reach the server.Please check your connction "
            } else {
                console.log("No respose received,likely a network error")
                message = "Newtork error, unable to reach the server.Please ycheck your connection"
            }

            toast.error(message)
            return Promise.reject(new Error(message));
        }
    }
)

export default axiosInstance
