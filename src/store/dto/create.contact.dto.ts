import { UUID } from "crypto";
import { CountryCode } from "../../models/CountryCode.enum";
import { ContactType } from "../../models/ContactType.enum";
import { ContactMethod } from "../../models/ContactMethod.enum";
import { Contact } from "../../models/Contact";

export class CreateContactDTO {

    first_name: string | null | undefined;
    last_name: string | null | undefined;
    description: string | null | undefined;
    email: string | null | undefined;
    website: string | null | undefined;
    company: UUID | null | undefined;
    country_phone_area_code: CountryCode | null | undefined;
    phone_number: string | null | undefined;
    whatsapp_country_phone_area_code: CountryCode | null | undefined;
    whatsapp_number: string | null | undefined;
    wechat_id: string | null | undefined;
    address: string | null | undefined;
    city: string | null | undefined;
    district: string | null | undefined;
    province: string | null | undefined;
    country: CountryCode | null | undefined;
    postal_code: string | null | undefined;
    contact_type: ContactType | null | undefined;
    last_contact: Date | null | undefined;
    contact_method: ContactMethod | null | undefined;

    static fromContact(contact: Contact) {
        let createContactDTO = new CreateContactDTO();
        createContactDTO.first_name = contact.firstName;
        createContactDTO.last_name = contact.lastName;
        createContactDTO.description = contact.description;
        createContactDTO.email = contact.email;
        createContactDTO.website = contact.website;
        createContactDTO.company = contact.company?.uuid;
        createContactDTO.country_phone_area_code = contact.countryPhoneAreaCode;
        createContactDTO.phone_number = contact.phoneNumber;
        createContactDTO.whatsapp_country_phone_area_code = contact.whatsappCountryPhoneAreaCode;
        createContactDTO.whatsapp_number = contact.whatsappNumber;
        createContactDTO.wechat_id = contact.wechatId;
        createContactDTO.address = contact.streetAddress;
        createContactDTO.city = contact.city;
        createContactDTO.district = contact.district;
        createContactDTO.province = contact.province;
        createContactDTO.country = contact.country
        createContactDTO.postal_code = contact.postalCode;
        createContactDTO.contact_type = contact.contactType;
        createContactDTO.last_contact = contact.lastContact;
        createContactDTO.contact_method = contact.contactMethod;

        
        return createContactDTO;
    }
}