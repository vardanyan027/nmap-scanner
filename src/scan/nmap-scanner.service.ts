import {Injectable} from '@nestjs/common';
import * as nmap from "../../vendor/node-nmap";
import { ScannerService } from "../app/nmap-scanner/scanner.service";
import { PortsService } from "../app/ports/ports.service";
import {Cron, CronExpression} from "@nestjs/schedule";

@Injectable()
export class NmapScannerService {
    constructor(private scannerService: ScannerService, private portService: PortsService) {}

    @Cron('0,30 * * * *')
    handleCron() {
        this.scan(process.env.RANGE);
    }

    public scan(range: string) {
        let scan = new nmap.OsAndPortScan(range);
        let startScanTime = new Date();

        var openPorts = [];

        scan.on('complete', (data) => {
            data.forEach((el) => {
                if(el["openPorts"]) {
                    openPorts = openPorts.concat(el["openPorts"]);
                }
            });
            this.portService.create(openPorts);

            let scanData = {
                data: JSON.stringify(data),
                period: scan.scanTime,
                status: 'complete',
                created_at: new Date()
            }

            this.scannerService.parse(scanData);

        });

        scan.on('error', (error) => {

            let scanData = {
                data: JSON.stringify(error),
                period: scan.scanTime,
                status: 'failed',
                created_at: startScanTime
            }

            this.scannerService.parse(scanData);

        });

        scan.startScan();

    }
}
