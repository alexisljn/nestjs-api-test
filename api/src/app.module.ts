import {Module} from '@nestjs/common';
import {ProductsModule} from "./products/products.module";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(`mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@mongo:27017/`,
            {dbName: process.env.MONGO_APP_DATABASE}),
        ProductsModule
    ]
})
export class AppModule {}
