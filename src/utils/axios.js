import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: 'c1bd12af1251984cbad70d43f6180718',
    },
})