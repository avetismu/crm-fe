import { UUID } from "crypto";
import { Company } from "../../models/Company";
import { Product } from "../../models/Product";

export class CreateProductDto {

    uuid: UUID | undefined | null;
    sku: string | undefined | null;
    productCode: string | undefined | null;
    barcode: string | undefined | null;
    manufacturer: string | undefined | null;
    variant: string | undefined | null;
    package: string | undefined | null;
    description: string | undefined | null;
    createdAt: Date | undefined | null;
    updatedAt: Date | undefined | null;

    static fromProduct(product: Product) {
        let createProductDto = new CreateProductDto();
        createProductDto.uuid = product.uuid;
        createProductDto.sku = product.sku;
        createProductDto.productCode = product.productCode;
        createProductDto.barcode = product.barcode;
        createProductDto.manufacturer = product.manufacturer?.uuid;
        createProductDto.variant = product.variant;
        createProductDto.package = product.package;
        createProductDto.description = product.description;
        createProductDto.createdAt = product.createdAt;
        createProductDto.updatedAt = product.updatedAt;
        
        return createProductDto;
    }
}
