import {Injectable} from '@nestjs/common';
import * as nmap from "../../vendor/node-nmap";
import { ScanHistoryService } from "../app/scanHistory/scanHistory.service";
import { PortsService } from "../app/ports/ports.service";
import {Cron} from "@nestjs/schedule";
import {IpAddressesService} from "../app/ip-addresses/ip-addresses.service";

@Injectable()
export class NmapScannerService {
    constructor(private scannerService: ScanHistoryService,
                private portService: PortsService,
                private ipAddressesService: IpAddressesService
    ) {}

    @Cron('27,50 * * * *')
    handleCron() {
        this.scan(process.env.RANGE);
    }

    public scan(range: string) {
        let scan = new nmap.OsAndPortScan(range);

        let openPorts = [];

        let scanData = {
            range: range,
            period: 0,
            status: 'processing',
            created_at: new Date()
        }

        this.scannerService.parse(scanData);

        scan.on('complete', async (data) => {
            console.log(data);

            await this.scannerService.changeStatusAndPeriod("completed", scan.scanTime);
            await this.ipAddressesService.create(data);
            data.forEach((el) => {
                if (el["openPorts"]) {
                    openPorts.push({
                        ip: el["ip"],
                        openPorts: el["openPorts"]
                    })
                }
            });
            await this.portService.create(openPorts);

        });

        scan.on('error', (error) => {

            this.scannerService.changeStatusAndPeriod("failed", scan.scanTime);

        });

        scan.startScan();
    }

}
