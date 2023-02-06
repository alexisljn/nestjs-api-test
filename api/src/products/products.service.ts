import { Injectable } from '@nestjs/common';
import {Product, ProductDocument} from "./schemas/product.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {ProductQueryArgs, ProductQueryFilters} from "./types/products.types";

@Injectable()
export class ProductsService {
    PRODUCTS_PER_PAGE = 20;
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    async findByCode(code: string): Promise<Product | null> {
        return this.productModel.findOne({code}).exec();
    }

    validateQueryArgs(queryArgs: ProductQueryArgs): boolean {
        if (Object.values(queryArgs).length === 0) {
            return true;
        }

        const {limit, page} = queryArgs;

        if (limit && (isNaN(parseInt(limit)) || parseInt(limit) > this.PRODUCTS_PER_PAGE || parseInt(limit) <= 0)) {
            return false;
        }

        if (page && (isNaN(parseInt(page)) || parseInt(page) <= 0)) {
            return false;
        }

        return true;
    }

    }
}
