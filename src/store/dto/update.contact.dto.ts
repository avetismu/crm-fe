import { UUID } from "crypto";
import { CountryCode } from "../../models/CountryCode.enum";
import { ContactType } from "../../models/ContactType.enum";
import { ContactMethod } from "../../models/ContactMethod.enum";
import { Contact } from "../../models/Contact";
import { CreateContactDTO } from "./create.contact.dto";

export class UpdateContactDTO extends CreateContactDTO{}