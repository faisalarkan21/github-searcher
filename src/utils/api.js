import axios from "axios";

export const Api = () => ({
  Config: () => {
    const client = {
      baseURL: process.env.REACT_APP_API_ENDPOINT,
    };
    return client;
  },
  Get: (url) => {
    return axios.get(url, Api().Config()).then((res) => res?.data);
  },
  Post: (url, body) => {
    return axios.post(url, body, Api().Config()).then((res) => res?.data);
  },
});
