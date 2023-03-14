import axios from "axios";

// This axios instance is configured to send requests to the pokemon api
const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// An axios interceptor is a function that runs prior to the request or response
// reaching the initial call
pokeApi.interceptors.response.use((response) => {
  // maybe i want to check the response and pass along something
  // different in certain situations

  return response.data;
});

export default pokeApi;
