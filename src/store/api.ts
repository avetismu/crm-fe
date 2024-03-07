import axios from 'axios';
import { Contact } from '../models/Contact';
import { CreateContactDTO } from './dto/create.contact.dto';

const BASE_URL = process.env.REACT_APP_API;
const GET_CONTACTS_ALL = '/contacts/all';
const CREATE_CONTACT = '/contacts/create';

export const enum API_STATE {
    LOADING = 'loading',
    IDLE = 'idle',
    ERROR = 'error',
    SUCCESS = 'success'
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

export const createContactAsync = async (contact : Contact) => {
    try {
        const createContactDTO = CreateContactDTO.fromContact(contact);
        const response = await userAPI.post(CREATE_CONTACT, createContactDTO);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create contact.');
    }
}