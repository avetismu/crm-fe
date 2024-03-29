import axios from 'axios';
import { Contact } from '../models/Contact';
import { CreateContactDTO } from './dto/create.contact.dto';
import { Company } from '../models/Company';
import { CreateCompanyDto } from './dto/create.company.dto';
import { UpdateContactDTO } from './dto/update.contact.dto';
import { UpdateCompanyDto } from './dto/update.company.dto';
import { Product } from '../models/Product';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

const BASE_URL = process.env.REACT_APP_API;

const GET_CONTACTS_ALL = '/contacts/all';
const GET_CONTACTS_BY_NAME = '/contacts/by_name/';
const GET_CONTACT_BY_UUID = '/contacts/';
const CREATE_CONTACT = '/contacts/create';
const UPDATE_CONTACT = '/contacts/';
const DELETE_CONTACT = 'contacts/'

const GET_COMPANIES_ALL = '/companies/all';
const GET_COMPANIES_BY_NAME = '/companies/by_name/';
const GET_COMPANY_BY_UUID = '/companies/';
const CREATE_COMPANY = '/companies/create';
const UPDATE_COMPANY = '/companies/'
const DELETE_COMPANY = '/companies/'

const GET_PRODUCTS_ALL = '/products/all';
const GET_QUERY_PRODUCT = '/products/query/';
const GET_PRODUCTS_BY_NAME = '/products/by_name/';
const GET_PRODUCT_BY_UUID = '/products/';
const CREATE_PRODUCT = '/products/create';
const UPDATE_PRODUCT = '/products/'
const DELETE_PRODUCT = '/products/'


export const enum API_STATE {
    LOADING = 'loading',
    IDLE = 'idle',
    ERROR = 'error',
    SUCCESS = 'success'
}

const userAPI = axios.create({
    baseURL: BASE_URL,
});

/* Contact */

export const fetchContactsAsync = async (page : Number) => {
    try {
        const response = await userAPI.get(GET_CONTACTS_ALL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch contacts.');
    }
}

export const getContactsByNameAsync = async (query : string) => {
    try {
        const response = await userAPI.get(GET_CONTACTS_BY_NAME + `${query}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to find contacts by name.');
    }
};

export const getContactByUUIDAsync = async (uuid : string) => {
    try {
        const response = await userAPI.get(GET_CONTACT_BY_UUID + `${uuid}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to find contact by uuid.');
    }
};


export const createContactAsync = async (contact : Contact) => {
    try {
        const createContactDTO = CreateContactDTO.fromContact(contact);
        const response = await userAPI.post(CREATE_CONTACT, createContactDTO);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create contact.');
    }
}

export const editContactAsync = async (contact : Contact) => {
    try {
        const updateContactDTO = UpdateContactDTO.fromContact(contact);
        const response = await userAPI.patch(UPDATE_CONTACT + contact.uuid, updateContactDTO);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update contact.');
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

/* Company */

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
        const response = await userAPI.get(GET_COMPANIES_BY_NAME + `${companyName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch contacts.');
    }
};

export const getCompanyByUUIDAsync = async (uuid : string) => {
    try {
        const response = await userAPI.get(GET_COMPANY_BY_UUID + `${uuid}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to find company by uuid.');
    }
};

export const createCompanyAsync = async (company : Company) => {
    try {
        const createContactDTO = CreateCompanyDto.fromCompany(company);
        const response = await userAPI.post(CREATE_COMPANY, createContactDTO);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create company.');
    }
}

export const editCompanyAsync = async (company : Company) => {
    try {
        console.log('editCompanyAsync company', company)
        const updateCompanyDto = UpdateCompanyDto.fromCompany(company);
        const response = await userAPI.patch(UPDATE_COMPANY + company.uuid, updateCompanyDto);
        return response.data;
    } catch (error) {
        throw new Error('Failed to updated company.');
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

/* Product */

export const fetchProductsAsync = async (page : Number) => {
    try {
        const response = await userAPI.get(GET_PRODUCTS_ALL);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch products.');
    }
}

export const queryProductAsync = async (query : string) => {
    try {
        const response = await userAPI.get(GET_QUERY_PRODUCT + `${query}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to query products.');
    }

}

/* Product */

export const createProductAsync = async (product : Product) => {
    try {
        const createProductDto = CreateProductDto.fromProduct(product);
        const response = await userAPI.post(CREATE_PRODUCT, createProductDto);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create product.');
    }
}


export const editProductAsync = async (product : Product) => {
    try {
        const updateProductDto = UpdateProductDto.fromProduct(product);
        const response = await userAPI.patch(UPDATE_PRODUCT + updateProductDto.uuid, updateProductDto);
        return response.data;
    } catch (error) {
        throw new Error('Failed to udpate product.');
    }
}

export const getProductByUUIDAsync = async (uuid : string) => {
    try {
        const response = await userAPI.get(GET_PRODUCT_BY_UUID + `${uuid}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to find product by uuid.');
    }
};

export const deleteSelectProductAsync = async (product : Product) => {
    try {
        const response = await userAPI.delete(DELETE_PRODUCT + `${product.uuid}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete product.');
    }
}