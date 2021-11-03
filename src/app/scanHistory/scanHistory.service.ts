import {Body, Injectable} from '@nestjs/common';
import {getRepository} from "typeorm";
import { ScanHistory } from "./scanHistory.entity";
import {PaginationDto} from "../dto/pagination.dto";
import {PaginatedScansResultDto} from "./dto/paginatedScansResult.dto";
import {Scans} from "../scans/scans.entity";
import {IpAddresses} from "../ip-addresses/ip-addresses.entity";

@Injectable()
export class ScanHistoryService {

    constructor() {}

    public async parse(@Body() data) {
        const scan = await getRepository(ScanHistory)
            .createQueryBuilder()
            .insert()
            .values({
                range: data.range,
                status: data.status,
                period: data.period,
                created_at: data.created_at
            })
            .execute();
        return scan;
    }

    public async changeStatusAndPeriod(status: string, period: number) {
        const scan = await getRepository(ScanHistory)
            .createQueryBuilder()
            .select()
            .orderBy('id', 'DESC')
            .limit(1)
            .getOne();
        scan.status = status;
        scan.period = period;
        await scan.save()
    }


    async findAll(paginationDto: PaginationDto): Promise<PaginatedScansResultDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

        const totalCount = await getRepository(ScanHistory)
            .createQueryBuilder()
            .getCount();
        const scans = await getRepository(ScanHistory)
            .createQueryBuilder()
            .orderBy("id", "DESC")
            .skip(skippedItems)
            .take(paginationDto.limit)
            .getMany();
        let pageCount = Math.ceil(totalCount / paginationDto.limit);
        return {
            totalCount,
            itemCountInPage: scans.length,
            page: paginationDto.page,
            pageCount: pageCount,
            limit: paginationDto.limit,
            data: scans,
        }
    }

    async find() {
        return await getRepository(ScanHistory)
            .createQueryBuilder()
            .select()
            .orderBy('id', 'DESC')
            .limit(1)
            .getOne();
    }

    async findById(id) {
        const scan = await getRepository(Scans)
            .createQueryBuilder( "scan")
            .select("scan.ipsId")
            .where("scan.scansId = :scansId", {
                scansId: id
            })
            .execute();
        let ipsData = []
        for (const el of scan) {
            if (el.ipsId) {
                const ips = await getRepository(IpAddresses)
                    .createQueryBuilder("ips")
                    .select()
                    .where("ips.id = :ipsId", {
                        ipsId: el.ipsId
                    })
                    .getMany();
                    ipsData.push(ips);
            }
        }
        return ipsData;
    }
}