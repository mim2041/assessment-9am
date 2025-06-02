import axios from 'axios';
import { tokenStorage } from '../utils/tokenStorage';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry) {
            if(error.response.data?.code === 'TOKEN_EXPIRED') {
                originalRequest._retry = true;
                try {
                    const refreshToken = tokenStorage.getRefreshToken();
                    if(refreshToken) {
                        const response = await api.post('/auth/refresh', { refreshToken });
                        tokenStorage.setAccessToken(response.data.accessToken);
                        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    tokenStorage.clearTokens();
                    window.location.href = '/signin';
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
)

export default api;