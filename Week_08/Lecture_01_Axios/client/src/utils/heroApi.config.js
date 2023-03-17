// To configure axios, you need to import axios
import axios from "axios";

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

heroApi.interceptors.response.use((response) => response.data);

export default heroApi;
