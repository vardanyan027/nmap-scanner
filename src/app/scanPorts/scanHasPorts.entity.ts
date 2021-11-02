import {BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Scans} from "../scans/scans.entity";
import {Ports} from "../ports/ports.entity";

@Entity()
export class ScanHasPorts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Scans, scan => scan.scansPorts)
    scans: Scans;

    @ManyToOne(() => Ports, ports => ports.scan)
    ports: Ports;
}