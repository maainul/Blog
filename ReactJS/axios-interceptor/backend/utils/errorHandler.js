import sendResponse from "./sendResponse.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || `Internal Server Error`

    // Log the error details (consider using a logging library for production)
    console.error(`[${new Date().toISOString()}] ${statusCode} - ${message}`);

    // Avoid exposing stack traces in production
    if (process.env.NODE_ENV === "production") {
        sendResponse(res, statusCode, message)
    } else {
        // Log additional details for debugging
        console.error("Request URL:", req.originalUrl);
        console.error("Request Body:", req.body);
        console.error("Stack Trace:", err.stack);
        // In development, include the stack trace in the response
        sendResponse(res, statusCode, message, { stack: err.stack })
    }
}

export default errorHandler