import {BaseEntity, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ScanHistory } from "../scanHistory/scanHistory.entity";
import { IpAddresses } from "../ip-addresses/ip-addresses.entity";
import {ScanHasPorts} from "../scanPorts/scanHasPorts.entity";

@Entity()
export class Scans extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ScanHistory, scan => scan.scans)
    scans: ScanHistory;

    @ManyToOne(() => IpAddresses, ips => ips.scans)
    ips: IpAddresses;

    @OneToMany(() => ScanHasPorts, scan => scan.scans)
    public scansPorts: ScanHasPorts[];
}