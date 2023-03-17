// To configure axios, you need to import axios
import axios from "axios";
import { toast } from "react-toastify";

// Then, create a new instance. The instance can be
// provided with a number of configuration options
const heroApi = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Interceptors are functions that are essentially injected prior to
// the code you write for axios. i.e. a request interceptor will be run
// before your request is actually sent, and response interceptor will be run
// before your response is returned to your code
heroApi.interceptors.request.use((request) => {
  // any code that you needed to run to modify
  // the outgoing request

  return request;
});

heroApi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    switch (error.response.status) {
      case 400:
        toast.error("Bad request, please try again.");
        break;
      case 404:
        toast.error("That resource does not exist.");
        break;
      case 422:
        toast.error(
          "Invalid submission. Check the form for errors and try again."
        );
        break;
      default:
        toast.error(
          "It's not you, it's me. Something went wrong, but it's not your fault."
        );
        break;
    }

    return Promise.reject(error);
  }
);

export default heroApi;
