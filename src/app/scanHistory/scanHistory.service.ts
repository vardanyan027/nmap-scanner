import {Injectable} from '@nestjs/common';
import {getRepository} from "typeorm";
import {ScanHistory } from "./scanHistory.entity";
import {PaginationDto} from "../dto/pagination.dto";
import {PaginatedScansResultDto} from "./dto/paginatedScansResult.dto";
import {Scans} from "../scans/scans.entity";
import {IpAddresses} from "../ip-addresses/ip-addresses.entity";
import {randomUUID} from "crypto";
import {ScanHasPorts} from "../scanPorts/scanHasPorts.entity";
import {Ports} from "../ports/ports.entity";
import {ScanDataDto} from "./dto/ScanDataDto";

@Injectable()
export class ScanHistoryService {

    constructor() {}

    public async parse(data: ScanDataDto) {
        const scan = await getRepository(ScanHistory)
            .createQueryBuilder()
            .insert()
            .values({
                range: data.range,
                status: data.status,
                period: data.period,
                uuid: randomUUID(),
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

    async findByUuid(uuid) {
        const scanHistory = await getRepository(ScanHistory)
            .createQueryBuilder("scanHistory")
            .select("scanHistory.id")
            .where("scanHistory.uuid = :uuid", {
                uuid: uuid
            })
            .getOne()
        const scan = await getRepository(Scans)
            .createQueryBuilder( "scan")
            .select("scan.ipsId")
            .where("scan.scansId = :scansId", {
                scansId: scanHistory.id
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

    async findPorts4Scans(param) {
        const scanHistory = await getRepository(ScanHistory)
            .createQueryBuilder("scanHistory")
            .select("scanHistory.id")
            .where("scanHistory.uuid = :scanUuid", {
                scanUuid: param.scanUuid
            })
            .getOne();
        const ips = await getRepository(IpAddresses)
            .createQueryBuilder("ips")
            .select("ips.id")
            .where("ips.uuid = :ipsUuid",{
                ipsUuid: param.ipUuid
            })
            .getOne()
        const scans = await getRepository(Scans)
            .createQueryBuilder("scans")
            .select("scans.id")
            .where("scans.scansId = :scanId", {
                scanId: scanHistory.id
            })
            .andWhere("scans.ipsId = :ipId",{
                ipId: ips.id
            })
            .getOne()
        const scanHasPorts = await getRepository(ScanHasPorts)
            .createQueryBuilder("scanPorts")
            .select()
            .where("scanPorts.scansId = :scanId", {
                scanId: scans.id
            })
            .execute();
        let portData = []
        for (const scanPorts of scanHasPorts) {
            const port = await getRepository(Ports)
                .createQueryBuilder("port")
                .select()
                .where("port.id = :id",{
                    id: scanPorts.scanPorts_portsId
                })
                .execute()
            portData.push(port);
        }
        return portData;
    }

}