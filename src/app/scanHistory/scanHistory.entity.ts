import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from 'typeorm';
import { Scans } from "../scans/scans.entity";

@Entity()
export class ScanHistory extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    uuid: string;

    @Column()
    range: string;

    @Column()
    status: string;

    @Column()
    period: number;

    @Column()
    created_at: Date;

    @OneToMany(() => Scans, scan => scan.scans)
    public scans: Scans[]
}