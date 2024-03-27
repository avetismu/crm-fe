import { UUID } from "crypto";
import { CountryCode } from "../../models/CountryCode.enum";
import { ContactType } from "../../models/ContactType.enum";
import { ContactMethod } from "../../models/ContactMethod.enum";
import { Contact } from "../../models/Contact";

export class UpdateContactDTO {

    first_name: string | null | undefined;
    last_name: string | null | undefined;
    description: string | null | undefined;
    email: string | null | undefined;
    company: UUID | null | undefined;
    country_phone_area_code: CountryCode | null | undefined;
    phone_number: string | null | undefined;
    whatsapp_country_phone_area_code: CountryCode | null | undefined;
    whatsapp_number: string | null | undefined;
    wechat_id: string | null | undefined;
    address: string | null | undefined;
    city: string | null | undefined;
    province: string | null | undefined;
    country: CountryCode | null | undefined;
    contact_type: ContactType | null | undefined;
    last_contact: Date | null | undefined;
    contact_method: ContactMethod | null | undefined;

    static fromContact(contact: Contact) {
        let updateContactDTO = new UpdateContactDTO();
        updateContactDTO.first_name = contact.firstName;
        updateContactDTO.last_name = contact.lastName;
        updateContactDTO.description = contact.description;
        updateContactDTO.email = contact.email;
        updateContactDTO.company = contact.company?.uuid ?? undefined;
        updateContactDTO.country_phone_area_code = contact.countryPhoneAreaCode;
        updateContactDTO.phone_number = contact.phoneNumber;
        updateContactDTO.whatsapp_country_phone_area_code = contact.whatsappCountryPhoneAreaCode;
        updateContactDTO.whatsapp_number = contact.whatsappNumber;
        updateContactDTO.wechat_id = contact.wechatId;
        updateContactDTO.address = contact.streetAddress;
        updateContactDTO.city = contact.city;
        updateContactDTO.province = contact.province;
        updateContactDTO.country = contact.country
        updateContactDTO.contact_type = contact.contactType;
        updateContactDTO.last_contact = contact.lastContact;
        updateContactDTO.contact_method = contact.contactMethod;

        
        return updateContactDTO;
    }
}