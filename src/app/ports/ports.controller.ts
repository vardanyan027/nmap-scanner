import {Controller, DefaultValuePipe, Get, ParseIntPipe, Query} from '@nestjs/common';
import {PortsService} from "./ports.service";
import {ApiForbiddenResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {Pagination} from "nestjs-typeorm-paginate";
import {Scans} from "../nmap-scanner/scanner.entity";
import {Ports} from "./ports.entity";

@ApiTags('open-ports')
@Controller('open-ports')
export class PortsController {

    constructor(public portsService: PortsService) {
    }

    @Get('/')
    @ApiOkResponse({ description: 'The resource list has been successfully returned' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Ports>> {
        limit = limit > 100 ? 100 : limit;
        return this.portsService.paginate({
            page,
            limit,
            route: 'http://localhost:8888/ports',
        });
    }

    createPort(data) {
        this.portsService.create(data);
    }
    
}
