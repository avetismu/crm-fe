import { UUID } from "crypto";
import { CountryCode } from "../../models/CountryCode.enum";
import { ContactType } from "../../models/ContactType.enum";
import { ContactMethod } from "../../models/ContactMethod.enum";
import { Company } from "../../models/Company";

export class UpdateCompanyDto {

    uuid : string | null | undefined;
    company_name: string | null | undefined;
    description: string | null | undefined;
    email: string | null | undefined;
    country_phone_area_code: CountryCode | null | undefined;
    phone_number: string | null | undefined;
    whatsapp_country_phone_area_code: CountryCode | null | undefined;
    whatsapp_number: string | null | undefined;
    wechat_id: string | null | undefined;
    street_address: string | null | undefined;
    city: string | null | undefined;
    province: string | null | undefined;
    country: CountryCode | null | undefined;
    contact_type: ContactType | null | undefined;
    last_contact: Date | null | undefined;
    contact_method: ContactMethod | null | undefined;
    parent_entity: UUID | null | undefined;

    static fromCompany(company: Company) {
        console.log('fromCompany company', company)
        let updateCompanyDto = new UpdateCompanyDto();
        updateCompanyDto.uuid = company.uuid;
        updateCompanyDto.company_name = company.companyName;
        updateCompanyDto.description = company.description;
        updateCompanyDto.email = company.email;
        updateCompanyDto.country_phone_area_code = company.countryPhoneAreaCode;
        updateCompanyDto.phone_number = company.phoneNumber;
        updateCompanyDto.whatsapp_country_phone_area_code = company.whatsappCountryPhoneAreaCode;
        updateCompanyDto.whatsapp_number = company.whatsappNumber;
        updateCompanyDto.wechat_id = company.wechatId;
        updateCompanyDto.street_address = company.streetAddress;
        updateCompanyDto.city = company.city;
        updateCompanyDto.province = company.province;
        updateCompanyDto.country = company.country
        updateCompanyDto.contact_type = company.contactType;
        updateCompanyDto.last_contact = company.lastContact;
        updateCompanyDto.contact_method = company.contactMethod;
        updateCompanyDto.parent_entity = company.parentEntity?.uuid;

        
        return updateCompanyDto;
    }
}