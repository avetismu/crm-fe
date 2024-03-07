import { UUID } from "crypto";
import { Contact } from "./Contact";
import { ContactMethod } from "./ContactMethod.enum";
import { CountryCode } from "./CountryCode.enum";
import { ContactType } from "./ContactType.enum";

export class Company {
    uuid: UUID | undefined;
    companyName: string | undefined;
    description: string | undefined;
    email: string | undefined;
    countryPhoneAreaCode: CountryCode | undefined;    
    phoneNumber: string | undefined;
    whatsappCountryPhoneAreaCode: CountryCode | undefined;  
    whatsappNumber: string | undefined;
    wechatId: string | undefined;
    streetAddress: string | undefined;
    city: string | undefined;
    province: string | undefined;
    country: CountryCode | undefined;  
    contactType: ContactType | undefined;
    lastContact: Date | undefined;
    contactMethod: ContactMethod | undefined;
    parentEntity: Company | undefined;
    subEntities: Company[] | undefined;
    contact: Contact[] | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}