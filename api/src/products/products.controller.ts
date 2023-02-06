import {
    Controller,
    Get,
    NotFoundException,
    Param,
} from "@nestjs/common";
import {ProductsService} from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get(':code')
    async findOne(@Param('code') code: string) {
        const product = await this.productsService.findByCode(code);

        if (product === null) {
            throw new NotFoundException();
        }

        return product;
    }
}