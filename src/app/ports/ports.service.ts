import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PortsRepository} from "./ports.repository";
import {PaginationDto} from "../dto/pagination.dto";
import {PaginatedPortsResultDto} from "./dto/paginatedPortsResult.dto";
import {IpAddressesRepository} from "../ip-addresses/ip-addresses.repository";
import {getManager, getRepository, Repository} from "typeorm";
import {IpAddresses} from "../ip-addresses/ip-addresses.entity";
import {ScanHistoryService} from "../scanHistory/scanHistory.service";
import {Scans} from "../scans/scans.entity";
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
                    let port = await this.findOrCreatePort(openPorts);
                    let scans = await this.scansService.getScan(el.ip);
                    await this.createScanPorts(scans, port);
                }
            }
        }

    }
    async findOrCreatePort (openPorts) {
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
        const port = await getRepository(Ports)
            .createQueryBuilder()
            .insert()
            .values({
                port: openPorts.port,
                protocol: openPorts.protocol,
                service: openPorts.service,
                method: openPorts.method
            })
            .execute();
        return port[0];
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
