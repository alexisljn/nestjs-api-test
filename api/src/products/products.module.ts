import {CacheModule, Module} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {ProductsController} from "./products.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "./schemas/product.schema";

@Module({
    imports: [
        CacheModule.register({ttl: 30*1000}), // 30 seconds
        MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {}