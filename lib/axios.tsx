import axios from "axios";

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const articlesApi = axios.create({
    baseURL: process.env.EXPO_PUBLIC_ARTICLES_API_URL,
});