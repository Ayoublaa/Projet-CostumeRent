import axios from 'axios';

// Remplacez par l'IP de votre ordinateur
const API_URL = 'http://172.20.10.5:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Services Authentification
export const authService = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  getProfile: (id) => api.get(`/user/${id}`),
  updateProfile: (id, data) => api.put(`/user/${id}`, data),
};

// Services Costumes
export const costumeService = {
  getAll: () => api.get('/costumes'),
  getById: (id) => api.get(`/costumes/${id}`),
  getAvailable: () => api.get('/costumes/available'),
  getByCategory: (category) => api.get(`/costumes/category/${encodeURIComponent(category)}`),
};

// Services Clients
export const clientService = {
  getAll: () => api.get('/clients'),
  getById: (id) => api.get(`/clients/${id}`),
  create: (data) => api.post('/clients', data),
  update: (id, data) => api.put(`/clients/${id}`, data),
};

// Services Réservations
export const reservationService = {
  getAll: () => api.get('/reservations'),
  getById: (id) => api.get(`/reservations/${id}`),
  getByUser: (userId) => api.get(`/reservations/user/${userId}`),
  create: (data) => api.post('/reservations', data),
  update: (id, data) => api.put(`/reservations/${id}`, data),
  cancel: (id) => api.delete(`/reservations/${id}`),
};

// URL des images
export const getImageUrl = (imageName) => {
  return `http://172.20.10.5:8000/images/${imageName}`;
};

export default api;
