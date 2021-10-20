import { Module } from '@nestjs/common';
import { PortsService } from './ports.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PortsRepository} from "./ports.repository";
import {Ports} from "./ports.entity";
import {ScannerService} from "../nmap-scanner/scanner.service";
import {ScannerRepository} from "../nmap-scanner/scanner.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Ports]), PortsRepository],
  providers: [PortsService, PortsRepository, ScannerRepository, ScannerService],
  exports: [PortsService, PortsRepository, ScannerService, ScannerRepository]
})
export class PortsModule {}
