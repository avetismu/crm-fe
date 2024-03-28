import { CountryCode } from "../models/CountryCode.enum"
import { countries } from "./CountryAutocompleteOptions"

/**
 * Formats the address based on the provided parameters.
 * 
 * @param streetAddress - The street address.
 * @param city - The city.
 * @param district - The district.
 * @param province - The province.
 * @param countryCode - The country code.
 * @returns The formatted address.
 */
export const formatAddress = (
    streetAddress : string | null | undefined, 
    city : string | null | undefined, 
    district : string | null | undefined, 
    province : string | null | undefined, 
    countryCode : CountryCode | string | null | undefined,
    postalCode : string | null | undefined
    ) : string => {
    let address = ''
    if (streetAddress && streetAddress !== undefined && streetAddress !== '') {
        address += streetAddress
    }
    if (city && city !== undefined && city !== '') {
        address += ', ' + city
    }
    if (district && district !== undefined && district !== '') {
        address += ', ' + district
    }
    if (province && province !== undefined && province !== '') {
        address += ', ' + province
    }
    if (countryCode && countryCode !== undefined) {
        address += ', ' + countries.find((country) => country.code === countryCode)?.label
    }
    if (postalCode && postalCode !== undefined && postalCode !== '') {
        address += ', ' + postalCode
    }

    return address
}