import axios from 'axios';
const port = 3000;
const baseURL = `http://localhost:${port}/api`;

const Api = axios.create({
  baseURL: baseURL,
});

export const AddToken = (token) => {
  Api.defaults.headers.common = {Authorization: token};
};

export const userApi = {
  login: (params) => Api.post('/users/login', params),
  signup: (params) => Api.post('/users/register', params),
  get: () => Api.get('users/profile'),
};

export const cartApi = {
  get: (params) => Api.get('/cart/items', params),
  add: (params) => Api.post('/cart/items', params),
  remove: (itemId, params) => Api.post(`/cart/items/${itemId}`, params),
  update: (itemId, params) => Api.post(`/cart/items/${itemId}`, params),
  clear: () => Api.post('/cart/items'),
};

export const categoryApi = {
  get: () => Api.get('/categories'),
};

export const productApi = {
  get: () => Api.get('/products'),
};
