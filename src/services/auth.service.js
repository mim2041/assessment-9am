import api from './api';
import { tokenStorage } from '../utils/tokenStorage';

export const authService = {
    async signup(userData) {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    },

    async signin(credentials) {
        const response = await api.post('/auth/signin', credentials);
        const { accessToken, refreshToken, user } = response.data;

        tokenStorage.setAccessToken(accessToken);
        if(refreshToken) {
            tokenStorage.setRefreshToken(refreshToken);
        }
        return { user };
    },

    async logout(){
        try{
            const refreshToken = tokenStorage.getRefreshToken();
            await api.post('/auth/logout', { refreshToken});
        } finally {
            tokenStorage.clearTokens();
        }
    },

    async getProfile() {
        const response = await api.get('/user/profile');
        return response.data.user;
    },

    async validateShopAccess(shopname) {
        const response = await api.get(`/user/shop/${shopname}`);
        return response.data;
    }
};