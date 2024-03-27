import { UUID } from "crypto";
import { Contact } from "./Contact";
import { ContactMethod } from "./ContactMethod.enum";
import { CountryCode } from "./CountryCode.enum";
import { ContactType } from "./ContactType.enum";

export class Company {

    uuid: UUID | null | undefined;
    companyName: string | null | undefined;
    description: string | null | undefined;
    email: string | null | undefined;
    countryPhoneAreaCode: CountryCode | null | undefined;    
    phoneNumber: string | null | undefined;
    whatsappCountryPhoneAreaCode: CountryCode | null | undefined;  
    whatsappNumber: string | null | undefined;
    wechatId: string | null | undefined;
    streetAddress: string | null | undefined;
    city: string | null | undefined;
    province: string | null | undefined;
    country: CountryCode | null | undefined;  
    contactType: ContactType | null | undefined;
    lastContact: Date | null | undefined;
    contactMethod: ContactMethod | null | undefined;
    parentEntity: Company | null | undefined;
    subEntities: Company[] | null | undefined;
    contacts: Contact[] | null | undefined;
    createdAt: Date | null | undefined;
    updatedAt: Date | null | undefined;

    static fromFormCompany(formCompany: any) {
        console.log('formCompany', formCompany)
        const company = new Company();
        company.uuid = formCompany.uuid;
        company.companyName = formCompany.companyName;
        company.description = formCompany.description;
        company.email = formCompany.email.value;
        company.countryPhoneAreaCode = formCompany.countryPhoneAreaCode;
        company.phoneNumber = formCompany.phoneNumber.value;
        company.whatsappCountryPhoneAreaCode = formCompany.whatsappCountryPhoneAreaCode;
        company.whatsappNumber = formCompany.whatsappNumber.value;
        company.wechatId = formCompany.wechatId.value;
        company.streetAddress = formCompany.streetAddress;
        company.city = formCompany.city;
        company.province = formCompany.province;
        company.country = formCompany.country;
        company.contactMethod = formCompany.contactMethod;
        company.contactType = formCompany.contactType;
        company.lastContact = formCompany.lastContact;
        company.parentEntity = formCompany.parentEntity;
        company.subEntities = formCompany.subEntities;
        company.contacts = formCompany.contacts;
        return company;
    }

    static toFormCompany(company: any) {
        return {
            uuid : company.uuid,
            companyName: company.companyName,
            description: company.description,
            email: {
                value: company.email,
                error: false,
            },
            countryPhoneAreaCode: company.countryPhoneAreaCode,
            phoneNumber: {
                value: company.phoneNumber,
                error: false,
            },
            whatsappCountryPhoneAreaCode: company.whatsappCountryPhoneAreaCode,
            whatsappNumber: {
                value: company.whatsappNumber,
                error: false,
            },
            wechatId: {
                value: company.wechatId,
                error: false,
            },
            streetAddress: company.streetAddress,
            city: company.city,
            province: company.province,
            country: company.country,
            contactType: company.contactType,
            lastContact: company.lastContact,
            contactMethod: company.contactMethod,
            parentEntity: company.parentEntity,
            subEntities: company.subEntities,
            contacts: company.contacts,
        };

    }
}