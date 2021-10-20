import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';

@Entity()
export class Ports extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    port: number;

    @Column()
    protocol: string;

    @Column()
    service: string;

    @Column()
    method: string;
}