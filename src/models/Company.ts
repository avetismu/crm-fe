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
}