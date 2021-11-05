import {Controller, Get, Param, Query} from '@nestjs/common';
import { ScanHistoryService } from "./scanHistory.service";
import {ApiForbiddenResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {PaginationDto} from "../dto/pagination.dto";
import {PaginatedScansResultDto} from "./dto/paginatedScansResult.dto";

@ApiTags('scans')
@Controller('scans')
export class ScanHistoryController {

    constructor(private scannerService: ScanHistoryService) {}

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

    @Get('/:uuid')
    async findByUuid(@Param() param) {
        return await this.scannerService.findByUuid(param.uuid);
    }

    @Get('/:scanUuid/ips/:ipUuid')
    async findPorts4Scans(@Param() param){
        return await this.scannerService.findPorts4Scans(param)
    }

}
