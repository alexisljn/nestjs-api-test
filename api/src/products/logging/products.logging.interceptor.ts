import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import {Observable} from 'rxjs';
import {Request} from "express";

@Injectable()
export class ProductsLoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const {method, originalUrl, ip} = context.switchToHttp().getRequest<Request>();

        console.log(`${method} ${originalUrl} FROM ${ip} AT ${new Date().toUTCString()}`);

        return next.handle();
    }
}