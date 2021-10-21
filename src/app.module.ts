import { Module } from '@nestjs/common';
import { ScannerModule } from './app/nmap-scanner/scanner.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ScannerController } from './app/nmap-scanner/scanner.controller';
import { ScannerService } from './app/nmap-scanner/scanner.service';
import { Scans } from "./app/nmap-scanner/scanner.entity";
import { ScannerRepository } from "./app/nmap-scanner/scanner.repository";
import { PortsController } from './app/ports/ports.controller';
import { PortsModule } from './app/ports/ports.module';
import { Ports } from "./app/ports/ports.entity";
import { PortsRepository } from "./app/ports/ports.repository";
import { PortsService } from "./app/ports/ports.service";
import { NmapScannerService } from "./scan/nmap-scanner.service";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";

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
              entities: [Scans, Ports],
              synchronize: true,
              migrationsRun: true,
          }
      ),
      ScheduleModule.forRoot(),
      ScannerModule,
      PortsModule,
  ],
  controllers: [ScannerController, PortsController],
  providers: [ScannerService, PortsService, ScannerRepository, PortsRepository, NmapScannerService],
})
export class AppModule {}
