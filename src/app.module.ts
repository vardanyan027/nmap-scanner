import { Module } from '@nestjs/common';
import { ScanHistoryModule } from './app/scanHistory/scanHistory.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScanHistoryController } from './app/scanHistory/scanHistory.controller';
import { ScanHistoryService } from './app/scanHistory/scanHistory.service';
import { ScanHistory } from "./app/scanHistory/scanHistory.entity";
import { PortsController } from './app/ports/ports.controller';
import { PortsModule } from './app/ports/ports.module';
import { Ports } from "./app/ports/ports.entity";
import { PortsRepository } from "./app/ports/ports.repository";
import { PortsService } from "./app/ports/ports.service";
import { NmapScannerService } from "./scan/nmap-scanner.service";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { IpAddressesService } from './app/ip-addresses/ip-addresses.service';
import { IpAddressesController } from './app/ip-addresses/ip-addresses.controller';
import { IpAddressesModule } from './app/ip-addresses/ip-addresses.module';
import {IpAddresses} from "./app/ip-addresses/ip-addresses.entity";
import {IpAddressesRepository} from "./app/ip-addresses/ip-addresses.repository";
import {Scans} from "./app/scans/scans.entity";
import {ScanHasPorts} from "./app/scanPorts/scanHasPorts.entity";
import {ScansService} from "./app/scans/scans.service";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
      }),
      TypeOrmModule.forRoot(
          {
              type: "mysql",
              host: process.env.DB_HOST,
              port: 3306,
              username: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              entities: [Scans, Ports, IpAddresses, ScanHistory, ScanHasPorts],
              synchronize: true,
              migrationsRun: true,
              autoLoadEntities: true
          }
      ),
      ScheduleModule.forRoot(),
      ScanHistoryModule,
      PortsModule,
      IpAddressesModule,
  ],
  controllers: [ScanHistoryController, PortsController, IpAddressesController],
  providers: [ScanHistoryService, PortsService, PortsRepository, NmapScannerService,
      IpAddressesService, IpAddressesRepository, ScansService],
})
export class AppModule {}
