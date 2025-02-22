export const handleApiError = (error) => {
  let message = "An unexpected error occurred. Please try again later.";
  if (error.response) {
    switch (error.response.status) {
      case 400:
        message = "Invalid request.Please check your input";
        break;
      case 403:
        message = "Request failed with status code 403";
        break;
      case 404:
        message = "Data not found";
        break;
      case 500:
        message = "Server error.Please try again later";
        break;
      default:
        message = "An unexpected error occured";
    }
  } else if (error.request) {
    message =
      "No response from the server.Please Check your internet connection.";
  } else {
    message = error.message;
  }
  console.error("API Error :", error);
  return { error: true, message };
};
