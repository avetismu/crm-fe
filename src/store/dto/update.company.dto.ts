import { UUID } from "crypto";
import { CountryCode } from "../../models/CountryCode.enum";
import { ContactType } from "../../models/ContactType.enum";
import { ContactMethod } from "../../models/ContactMethod.enum";
import { Company } from "../../models/Company";
import { CreateCompanyDto } from "./create.company.dto";

export class UpdateCompanyDto extends CreateCompanyDto {}

