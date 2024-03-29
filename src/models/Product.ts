import { UUID } from "crypto";
import { Company } from "./Company";

export class Product {
    uuid: UUID | undefined | null;
    sku: string | undefined | null;
    productCode: string | undefined | null;
    barcode: string | undefined | null;
    manufacturer: Company | undefined | null;
    variant: string | undefined | null;
    package: string | undefined | null;
    description: string | undefined | null;
    createdAt: Date | undefined | null;
    updatedAt: Date | undefined | null;

    static fromFormProduct = (formProduct: any) : Product => {
        const product = new Product();

        product.uuid = formProduct.uuid;
        product.sku = formProduct.sku;
        product.productCode = formProduct.productCode;
        product.barcode = formProduct.barcode;
        product.manufacturer = formProduct.manufacturer;
        product.variant = formProduct.variant;
        product.package = formProduct.package;
        product.description = formProduct.description;
        product.createdAt = formProduct.createdAt;
        product.updatedAt = formProduct.updatedAt;
        
        return product;
    }

    static toFormProduct = (product: Product) : any => {
        return {
            uuid: product.uuid,
            sku: product.sku,
            productCode: product.productCode,
            barcode: product.barcode,
            manufacturer: product.manufacturer,
            variant: product.variant,
            package: product.package,
            description: product.description,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }
    }
}