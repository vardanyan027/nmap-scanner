import {Injectable} from '@nestjs/common';
import {getManager, getRepository} from "typeorm";
import {IpAddresses} from "./ip-addresses.entity";
import {ScanHistoryService} from "../scanHistory/scanHistory.service";
import {Scans} from "../scans/scans.entity";
import {randomUUID} from "crypto";

@Injectable()
export class IpAddressesService {

    constructor(private scannerService: ScanHistoryService) {}

    async create(data) {
        const scan = await this.scannerService.find();
        if (data.length !== 0) {
            for (const el of data) {
                let ips = await this.find(el);
                let scan_ips = new Scans();
                scan_ips.scans = scan;
                scan_ips.ips = ips;
                await scan_ips.save();
            }
        }
        return scan;
    }

    async find(data) {
        let ips = await getManager()
            .createQueryBuilder(IpAddresses, "ipAddresses")
            .where("ipAddresses.ip = :ip",
                {ip: data.ip}
            )
            .getOne();
        if (!ips) {
            data.uuid = randomUUID();
            ips = await this.createAndFind(data);
        }
        return ips;
    }

    async createAndFind(data) {
        await getRepository(IpAddresses)
            .createQueryBuilder()
            .insert()
            .values({
                hostname: data.hostname,
                ip: data.ip,
                mac: data.mac,
                osNmap: data.osNmap,
                vendor: data.vendor,
                uuid: data.uuid
            })
            .execute();
        let ips = await getManager()
            .createQueryBuilder(IpAddresses, "ipAddresses")
            .where("ipAddresses.ip = :ip",
                {ip: data.ip}
            )
            .getOne();
        return ips;
    }
}
