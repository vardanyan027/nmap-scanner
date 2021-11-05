import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Scans } from "../scans/scans.entity";

@Entity()
export class IpAddresses extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    uuid: string;

    @Column({
        nullable: true
    })
    hostname: string

    @Column()
    ip: string;

    @Column({
        nullable: true
    })
    mac: string;

    @Column({
        nullable: true
    })
    osNmap: string;

    @Column({
        nullable: true
    })
    vendor: string



    @OneToMany(() => Scans, scans => scans.ips)
    scans: Scans[]
}