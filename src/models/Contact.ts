import { UUID } from "crypto";
import { CountryCode } from "./CountryCode.enum";
import { Company } from "./Company";
import { ContactType } from "./ContactType.enum";
import { ContactMethod } from "./ContactMethod.enum";

export class Contact {
    uuid: UUID | null | undefined;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    description: string | null | undefined;
    company: Company | null | undefined;
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
    createdAt: Date | null | undefined;
    updatedAt: Date | null | undefined;


     static fromFormContact = (formContact: any) : Contact => {
        const contact = new Contact();

        contact.uuid = formContact.uuid;
        contact.firstName = formContact.firstName;
        contact.lastName = formContact.lastName;
        contact.description = formContact.description;
        contact.company = formContact.company;
        contact.email = formContact.email.value;
        contact.countryPhoneAreaCode = formContact.countryPhoneAreaCode;
        contact.phoneNumber = formContact.phoneNumber.value;
        contact.whatsappCountryPhoneAreaCode = formContact.whatsappCountryPhoneAreaCode;
        contact.whatsappNumber = formContact.whatsappNumber.value;
        contact.wechatId = formContact.wechatId.value;
        contact.streetAddress = formContact.streetAddress;
        contact.city = formContact.city;
        contact.province = formContact.province;
        contact.country = formContact.country;
        contact.contactType = formContact.contactType;
        contact.lastContact = formContact.lastContact;
        contact.contactMethod = formContact.contactMethod;
        
        return contact;
    }

    static toFormContact = (contact : any | Contact) : any  => {
        return {
            uuid : contact.uuid,
            firstName : contact.firstName, 
            lastName : contact.lastName,
            description : contact.description,
            company : contact.company,
            email : {
                value : contact.email,
                error : false
            },
            wechatId : {
                value : contact.wechatId,
                error : false
            },
            countryPhoneAreaCode : contact.countryPhoneAreaCode,
            phoneNumber : {
                value : contact.phoneNumber,
                error : false
            },
            whatsappCountryPhoneAreaCode : contact.whatsappCountryPhoneAreaCode,
            whatsappNumber : {
                value : contact.whatsappNumber,
                error : false
            },
            streetAddress : contact.streetAddress,
            city : contact.city,
            province : contact.province,
            country : contact.country,
            contactType : contact.contactType,
            lastContact : contact.lastContact,
            contactMethod : contact.contactMethod
        }
    }

}