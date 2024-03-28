import { UUID } from "crypto";
import { CountryCode } from "../../models/CountryCode.enum";
import { ContactType } from "../../models/ContactType.enum";
import { ContactMethod } from "../../models/ContactMethod.enum";
import { Company } from "../../models/Company";

export class CreateCompanyDto {

    company_name: string | null | undefined;
    description: string | null | undefined;
    email: string | null | undefined;
    website: string | null | undefined;
    country_phone_area_code: CountryCode | null | undefined;
    phone_number: string | null | undefined;
    whatsapp_country_phone_area_code: CountryCode | null | undefined;
    whatsapp_number: string | null | undefined;
    wechat_id: string | null | undefined;
    street_address: string | null | undefined;
    city: string | null | undefined;
    district: string | null | undefined;
    province: string | null | undefined;
    country: CountryCode | null | undefined;
    postal_code: string | null | undefined;
    contact_type: ContactType | null | undefined;
    last_contact: Date | null | undefined;
    contact_method: ContactMethod | null | undefined;
    parent_entity: UUID | null | undefined;

    static fromCompany(company: Company) {
        let createCompanyDto = new CreateCompanyDto();
        createCompanyDto.company_name = company.companyName;
        createCompanyDto.description = company.description;
        createCompanyDto.email = company.email;
        createCompanyDto.website = company.website;
        createCompanyDto.country_phone_area_code = company.countryPhoneAreaCode;
        createCompanyDto.phone_number = company.phoneNumber;
        createCompanyDto.whatsapp_country_phone_area_code = company.whatsappCountryPhoneAreaCode;
        createCompanyDto.whatsapp_number = company.whatsappNumber;
        createCompanyDto.wechat_id = company.wechatId;
        createCompanyDto.street_address = company.streetAddress;
        createCompanyDto.city = company.city;
        createCompanyDto.district = company.district;
        createCompanyDto.province = company.province;
        createCompanyDto.postal_code = company.postalCode;
        createCompanyDto.country = company.country
        createCompanyDto.contact_type = company.contactType;
        createCompanyDto.last_contact = company.lastContact;
        createCompanyDto.contact_method = company.contactMethod;
        createCompanyDto.parent_entity = company.parentEntity?.uuid;

        
        return createCompanyDto;
    }
}