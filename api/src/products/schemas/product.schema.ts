import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({alias: 'productName'})
    product_name: string;

    @Prop()
    code: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);