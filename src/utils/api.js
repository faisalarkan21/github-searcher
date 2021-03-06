import axios from "axios";

export const Api = () => ({
  Config: () => {
    const headers = {};

    const githubToken = process.env.REACT_APP_GITHUB_TOKEN;
    const baseURL = process.env.REACT_APP_API_ENDPOINT;

    headers["Authorization"] = `token ${githubToken}`;

    if (!githubToken) {
      delete headers["Authorization"];
    }

    const client = {
      baseURL: baseURL,
      headers,
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
