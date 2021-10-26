import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';

@Entity()
export class Scans extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    range: string;

    @Column()
    status: string;

    @Column()
    period: number;

    @Column()
    created_at: Date;
}