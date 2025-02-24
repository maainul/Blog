const ERROR_MESSAGE = {
    400: "Bad Request.Please try again",
    401: "You are not authorized to view this resource.Please log in.",
    403: "You are not have permission to perform this section.",
    404: "Resource not found",
    408: "Request timeout.Pleas try agin",
    500: "An unpexted server error occurred. Please try again later.",
    502: "Bad Gateway. The server is down or being upgraded",
    503: "Service unavailable.Please try again later",
    504: "Gateway timeout.Please try again later",
    GENERIC_ERROR: "Something went wrong.Please try agin.",
    NETWORK_ERROR: "Network error, unable to reach the server.Please check your connection.",
    REQUEST_ERROR: "Network error, unable to reach the server.Please check your connection."
}

export default ERROR_MESSAGE;
