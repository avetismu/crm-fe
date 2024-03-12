import axios from 'axios';
import { Contact } from '../models/Contact';
import { CreateContactDTO } from './dto/create.contact.dto';
import { Company } from '../models/Company';
import { CreateCompanyDto } from './dto/create.company.dto';

const BASE_URL = process.env.REACT_APP_API;

const GET_CONTACTS_ALL = '/contacts/all';
const CREATE_CONTACT = '/contacts/create';
const DELETE_CONTACT = 'contacts/'

const GET_COMPANIES_ALL = '/companies/all';
const GET_COMPANIES_BY_NAME = '/companies/by_name';
const CREATE_COMPANY = '/companies/create';
const DELETE_COMPANY = '/companies/'


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

export const deleteSelectedContactAsync = async (contact : Contact) => {
    try {
        const response = await userAPI.delete(DELETE_CONTACT + `${contact.uuid}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete contact.');
    }

}

export const fetchCompaniesAsync = async (page : Number) => {
    try {
        const response = await userAPI.get(GET_COMPANIES_ALL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch contacts.');
    }
}

export const getCompaniesByNameAsync = async (companyName : string) => {
    try {
        const response = await userAPI.get(GET_COMPANIES_BY_NAME + `/${companyName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch contacts.');
    }
};

export const createCompanyAsync = async (company : Company) => {
    try {
        const createContactDTO = CreateCompanyDto.fromCompany(company);
        const response = await userAPI.post(CREATE_COMPANY, createContactDTO);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create contact.');
    }
}

export const deleteSelectCompanyAsync = async (company : Company) => {
    try {
        const response = await userAPI.delete(DELETE_COMPANY + `${company.uuid}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete contact.');
    }
}