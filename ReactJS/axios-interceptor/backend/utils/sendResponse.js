const sendResponse = (res, statusCode, message, data = null) => {
    const response = {
        success: statusCode >= 200 && statusCode < 300,
        message,
    }
    if (data) {
        response.data = data
    }
    res.status(statusCode).json(response)
}

export default sendResponse
