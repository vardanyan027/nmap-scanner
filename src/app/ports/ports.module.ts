import {Module} from '@nestjs/common';
import {PortsService } from './ports.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PortsRepository} from "./ports.repository";
import {Ports} from "./ports.entity";
import {ScanHistoryService} from "../scanHistory/scanHistory.service";
import {IpAddressesRepository} from "../ip-addresses/ip-addresses.repository";
import {Repository} from "typeorm";
import {ScanHistoryRepository} from "../scanHistory/scanHistory.repository";
import {ScansService} from "../scans/scans.service";

@Module({
  imports: [TypeOrmModule.forFeature([Ports]), PortsRepository],
  providers: [PortsService, PortsRepository, ScanHistoryService, ScanHistoryRepository,IpAddressesRepository, Repository, ScansService],
  exports: [PortsService, PortsRepository, ScanHistoryService, ScanHistoryRepository,IpAddressesRepository, Repository, ScansService]
})
export class PortsModule {}
