import { Repository, EntityRepository } from 'typeorm';
import { Scans } from './scanner.entity';
import { ScanDataDto } from "./dto/ScanDataDto";
import { Injectable } from "@nestjs/common";

@Injectable()
@EntityRepository(Scans)
export class ScannerRepository extends Repository<Scans> {

    public async createScans(dataScan: ScanDataDto) {
        const { data, period, status, created_at } = dataScan;
        const scan = new Scans();
        scan.data = JSON.stringify(data);
        scan.period = period;
        scan.status = status;
        scan.created_at = created_at;
        await scan.save();
    }

    public findAll(skippedItems: number, limit: number) {
        return Scans.find({
            order: {id: "DESC"},
            skip: skippedItems,
            take: limit,
        });
    }

    public async count() {
        return Scans.count();
    }
}
