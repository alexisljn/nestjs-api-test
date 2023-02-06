import {
    BadRequestException,
    CacheInterceptor,
    Controller,
    Get,
    NotFoundException,
    Param,
    Query,
    UseInterceptors
} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {ProductQueryArgs} from "./types/products.types";
import {ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ProductsLoggingInterceptor} from "./logging/products.logging.interceptor";

@ApiTags('products')
@Controller('products')
@UseInterceptors(CacheInterceptor, ProductsLoggingInterceptor)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @ApiQuery({name: 'product_name', description: 'Name of the products', required: false, example: 'chips'})
    @ApiQuery({name: 'limit', description: 'Numbers of product (max = 20)', required: false, example: '5'})
    @ApiQuery({name: 'page', description: 'Desired page (relevant with limit)', required: false, example: '2'})
    @ApiResponse({status: 200, description: 'List of products'})
    @ApiResponse({status: 400, description: 'Bad request due to invalid query string'})
    @Get()
    async findAll(@Query() queryArgs: ProductQueryArgs) {
        if (!this.productsService.validateQueryArgs(queryArgs)) {
            throw new BadRequestException();
        }

        const queryFilters = this.productsService.generateQueryFilters(queryArgs);

        return await this.productsService.findAll(queryFilters)
    }

    @ApiParam({name: 'code', description: 'Product\'s code', type: 'string', required: true, example: '0000000000100'})
    @ApiResponse({status: 200, description: 'Found product'})
    @ApiResponse({status: 404, description: "Not Found"})
    @Get(':code')
    async findOne(@Param('code') code: string) {
        const product = await this.productsService.findByCode(code);

        if (product === null) {
            throw new NotFoundException();
        }

        return product;
    }
}