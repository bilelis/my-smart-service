/**
 * API Service Factory
 * Distributed under the MIT License.
 * 
 * Provides centralized Axios configuration and endpoint definitions 
 * for the Tunisie Internship Management Platform.
 */
import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for adding the JWT token automatically to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling 401 errors (token expired) and global redirects
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

/**
 * Authentication Services
 * Handles login, registration, and user profile retrieval.
 */
export const authService = {
    login: (credentials) => {
        const params = new URLSearchParams();
        params.append('username', credentials.username);
        params.append('password', credentials.password);
        return api.post('/auth/login', params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    },
    register: (userData) => api.post('/auth/register', userData),
    getProfile: () => api.get('/auth/me'),
    uploadCV: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/auth/upload-cv', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
};

/**
 * Internship Offers Management
 * CRUD operations for internship listings.
 */
export const offerApi = {
    getAll: (params) => api.get('/offers/', { params }),
    getById: (id) => api.get(`/offers/${id}`),
    create: (data) => api.post('/offers/', data),
    update: (id, data) => api.put(`/offers/${id}`, data),
    delete: (id) => api.delete(`/offers/${id}`),
    getCompanyOffers: () => api.get('/offers/company'),
};

/**
 * Internship Applications
 * Handling the application flow and status updates.
 */
export const applicationApi = {
    apply: (data) => api.post('/applications/', data),
    getStagiaireApplications: () => api.get('/applications/my-applications'),
    getCompanyApplications: () => api.get('/applications/company'),
    updateStatus: (id, status) => api.patch(`/applications/${id}`, { status }),
    getAllApplications: () => api.get('/applications/all'),
};

/**
 * Admin Services
 * High-level system oversight and user management.
 */
export const adminApi = {
    getUsers: () => api.get('/admin/users'),
    getStats: () => api.get('/admin/stats'),
    getAllApplications: () => api.get('/admin/applications'),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

export default api;
