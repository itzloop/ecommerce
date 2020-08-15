import axios from 'axios';
const port = 3000;
const baseURL = `http://10.51.0.9:${port}/api`;

const Api = axios.create({
  baseURL: baseURL,
});

export const userApi = {
  test: () => Api.get('/test'),
  login: (params) => Api.post('/users/login', params),
  signup: (params) => Api.post('/users/register', params),
};
