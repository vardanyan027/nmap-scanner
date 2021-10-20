import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';

@Entity()
export class Scans extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "json"
    })
    data: string;

    @Column()
    period: number;

    @Column()
    created_at: Date;

    @Column()
    status: string;
}