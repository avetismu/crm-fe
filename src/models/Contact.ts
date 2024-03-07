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
}