import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import {IpAddresses} from "../ip-addresses/ip-addresses.entity";
import {Scans} from "../scans/scans.entity";
import {ScanHasPorts} from "../scanPorts/scanHasPorts.entity";

@Entity()
export class Ports extends BaseEntity{

    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int'
    })
    id: number;

    @Column()
    port: number;

    @Column()
    protocol: string;

    @Column()
    service: string;

    @Column()
    method: string;

    @OneToMany(() => ScanHasPorts, scan => scan.ports)
    public scan: ScanHasPorts[]
}