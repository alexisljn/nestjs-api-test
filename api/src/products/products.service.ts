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

    generateQueryFilters(queryArgs: ProductQueryArgs): ProductQueryFilters {
        const {product_name, limit, page} = queryArgs;

        const queryFilters: ProductQueryFilters = {product_name: '', limit: this.PRODUCTS_PER_PAGE, skip: 0};

        if (limit) {
            queryFilters.limit = parseInt(limit);
        }

        if (page) {
            queryFilters.skip = (parseInt(page) - 1) * queryFilters.limit;
        }

        if (product_name) {
            queryFilters.product_name = product_name
        }

        return queryFilters;
    }
}
