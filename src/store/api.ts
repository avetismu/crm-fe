import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API;
const GET_CONTACTS_ALL = '/contacts/all';

export const enum API_STATE {
    LOADING = 'loading',
    IDLE = 'idle',
    ERROR = 'error',
}

const userAPI = axios.create({
    baseURL: BASE_URL,
});

export const fetchContactsAsync = async (page : Number) => {
    try {
        const response = await userAPI.get(GET_CONTACTS_ALL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch contacts.');
    }
}