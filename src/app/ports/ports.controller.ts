import {Controller, Get, Query} from '@nestjs/common';
import {PortsService} from "./ports.service";
import {ApiForbiddenResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {PaginationDto} from "../dto/pagination.dto";
import {PaginatedPortsResultDto} from "./dto/paginatedPortsResult.dto";

@ApiTags('open-ports')
@Controller('open-ports')
export class PortsController {

    constructor(public portsService: PortsService) {
    }

    @Get('/')
    @ApiOkResponse({ description: 'The resource list has been successfully returned' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async findAll(
        @Query() paginationDto: PaginationDto
    ): Promise<PaginatedPortsResultDto> {
        paginationDto.page = Number(paginationDto.page) || 1;
        paginationDto.limit = Number(paginationDto.limit) || 10;

        return this.portsService.findAll({
            ...paginationDto,
            limit: paginationDto.limit > 10 ? 10 : paginationDto.limit
        })
    }

}
