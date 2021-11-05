import {Body, Injectable} from '@nestjs/common';
import {PaginationDto} from "../dto/pagination.dto";
import {PaginatedPortsResultDto} from "./dto/paginatedPortsResult.dto";
import {getManager, getRepository} from "typeorm";
import {ScanHasPorts} from "../scanPorts/scanHasPorts.entity";
import {Ports} from "./ports.entity";
import {ScansService} from "../scans/scans.service";

@Injectable()
export class PortsService {

    constructor(
        private scansService: ScansService,
    ) {}

    async findAll(paginationDto: PaginationDto): Promise<PaginatedPortsResultDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

        const totalCount = await getRepository(Ports).createQueryBuilder().getCount();
        const ports = await getRepository(Ports)
            .createQueryBuilder()
            .skip(skippedItems)
            .take(paginationDto.limit)
            .getMany();
        let pageCount = Math.ceil(totalCount / paginationDto.limit);

        return {
            totalCount,
            itemCountInPage: ports.length,
            page: paginationDto.page,
            pageCount: pageCount,
            limit: paginationDto.limit,
            data: ports
        }
    }

    public async create(@Body() data) {

        if (data.length !== 0) {
            for (const el of data) {
                for (const openPorts of el.openPorts) {
                    let port = await this.findPort(openPorts);
                    let scans = await this.scansService.getScan(el.ip);
                    await this.createScanPorts(scans, port);
                }
            }
        }

    }
    async findPort (openPorts) {
        let port = await getManager()
            .createQueryBuilder(Ports, "ports")
            .where("ports.port = :port",
                {port: openPorts.port}
            )
            .getOne();
        if (!port) {
            port = await this.createPort(openPorts);
        }
        return port;
    }

    async createPort(openPorts) {
        await getRepository(Ports)
            .createQueryBuilder()
            .insert()
            .values({
                port: openPorts.port,
                protocol: openPorts.protocol,
                service: openPorts.service,
                method: openPorts.method
            })
            .execute();
        let port = await getManager()
            .createQueryBuilder(Ports, "ports")
            .where("ports.port = :port",
                {port: openPorts.port}
            )
            .getOne();
        return port;
    }

    public async createScanPorts(scan, port) {
        await getRepository(ScanHasPorts)
            .createQueryBuilder()
            .insert()
            .values({
                scans: scan,
                ports: port
            })
            .execute();
    }

}
