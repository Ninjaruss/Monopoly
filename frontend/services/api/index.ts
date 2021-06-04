import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default {
  initAxios: (token: string | null): void => {
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token.replace(
        /"/g,
        '',
      )}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  },
  refreshAccessToken: async () => {
    try {
      const { data } = await axiosInstance.post('/api/users/refresh/');
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
  login: async (email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post('/api/users/login/', {
        email,
        password,
      });
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  },
};
