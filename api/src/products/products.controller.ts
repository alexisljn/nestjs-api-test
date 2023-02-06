import {
    BadRequestException,
    Controller,
    Get,
    NotFoundException,
    Param,
    Query
} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {ProductQueryArgs} from "./types/products.types";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(@Query() queryArgs: ProductQueryArgs) {
        if (!this.productsService.validateQueryArgs(queryArgs)) {
            throw new BadRequestException();
        }

        const queryFilters = this.productsService.generateQueryFilters(queryArgs);

        return await this.productsService.findAll(queryFilters)
    }

    @Get(':code')
    async findOne(@Param('code') code: string) {
        const product = await this.productsService.findByCode(code);

        if (product === null) {
            throw new NotFoundException();
        }

        return product;
    }
}