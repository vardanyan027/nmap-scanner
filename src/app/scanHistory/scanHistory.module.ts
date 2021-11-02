import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ScanHistoryService} from "./scanHistory.service";
import {PortsService} from "../ports/ports.service";
import {PortsRepository} from "../ports/ports.repository";
import {IpAddressesRepository} from "../ip-addresses/ip-addresses.repository";
import {ScanHistory} from "./scanHistory.entity";
import {ScanHistoryRepository} from "./scanHistory.repository";
import {Repository} from "typeorm";
import {ScansService} from "../scans/scans.service";

@Module({
    imports: [TypeOrmModule.forFeature([ScanHistory])],
    providers: [ScanHistoryService, PortsService, PortsRepository, IpAddressesRepository, ScanHistoryRepository, Repository, ScansService],
    exports: [ScanHistoryService, PortsService, PortsRepository, IpAddressesRepository, ScanHistoryRepository, Repository, ScansService]
})
export class ScanHistoryModule {}
