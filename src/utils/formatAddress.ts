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
    if (streetAddress && streetAddress !== '') {
        address += streetAddress
    }
    if (city && city !== '') {
        address += ', ' + city
    }
    if (district && district !== '') {
        address += ', ' + district
    }
    if (province && province !== '') {
        address += ', ' + province
    }
    if (countryCode) {
        address += ', ' + countries.find((country) => country.code === countryCode)?.label
    }
    if (postalCode && postalCode !== '') {
        address += ', ' + postalCode
    }

    return address
}