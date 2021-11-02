import {Injectable} from '@nestjs/common';
import {getRepository, Repository} from "typeorm";
import {IpAddresses} from "../ip-addresses/ip-addresses.entity";
import {Scans} from "./scans.entity";
import {ScanHistoryService} from "../scanHistory/scanHistory.service";
import {PortsRepository} from "../ports/ports.repository";

@Injectable()
export class ScansService {
    constructor(
        private scannerService: ScanHistoryService,
    ) {}

    async getScan(ip) {
        let scanHistory = await this.scannerService.find();
        let ips = await getRepository(IpAddresses)
            .createQueryBuilder("ips")
            .where("ips.ip = :ip", {ip: ip})
            .getOne();
        const scan = await getRepository(Scans)
            .createQueryBuilder("scans")
            .where("scans.scansId = :id", {id: scanHistory.id})
            .andWhere("scans.ipsId = :ipId", {ipId: ips.id})
            .getOne();
        return scan;
    }
}