import {Controller, Get, Query} from '@nestjs/common';
import { ScannerService } from "./scanner.service";
import {ApiForbiddenResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {PaginationDto} from "../dto/pagination.dto";
import {PaginatedScansResultDto} from "./dto/paginatedScansResult.dto";

@ApiTags('scans')
@Controller('scans')
export class ScannerController {

    constructor(private scannerService: ScannerService,
                ) {
    }

    @Get('/')
    @ApiOkResponse({ description: 'The resource list has been successfully returned' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedScansResultDto> {
        paginationDto.page = Number(paginationDto.page) || 1;
        paginationDto.limit = Number(paginationDto.limit) || 10;

        return this.scannerService.findAll({
            ...paginationDto,
            limit: paginationDto.limit > 10 ? 10 : paginationDto.limit
        })
    }

}
