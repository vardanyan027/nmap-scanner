import {Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query} from '@nestjs/common';
import { ScannerService } from "./scanner.service";
import {ApiForbiddenResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import { Pagination } from 'nestjs-typeorm-paginate';
import {Scans} from "./scanner.entity";

@ApiTags('scans')
@Controller('scans')
export class ScannerController {

    constructor(private scannerService: ScannerService,
                ) {
    }

    @Get('/')
    @ApiOkResponse({ description: 'The resource list has been successfully returned' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Scans>> {
        limit = limit > 100 ? 100 : limit;
        return this.scannerService.paginate({
            page,
            limit,
            route: 'http://localhost:8000/scans',
        });
    }

}
