import { Injectable } from '@nestjs/common';
import {Product, ProductDocument} from "./schemas/product.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    async findByCode(code: string): Promise<Product | null> {
        return this.productModel.findOne({code}).exec();
    }

}
