import { Module } from '@nestjs/common';
// import {NmapScannerService} from "../../scan/nmap-scanner.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScannerService} from "./scanner.service";
import {ScannerRepository} from "./scanner.repository";
import {PortsService} from "../ports/ports.service";
import {PortsRepository} from "../ports/ports.repository";

@Module({
    imports: [TypeOrmModule.forFeature([ScannerRepository]), ScannerRepository],
    providers: [ScannerService, ScannerRepository, PortsService, PortsRepository],
    exports: [ScannerService, ScannerRepository, PortsService, PortsRepository]
})
export class ScannerModule {}
