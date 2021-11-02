import { Repository, EntityRepository } from 'typeorm';
import { ScanDataDto } from "./dto/ScanDataDto";
import { Injectable } from "@nestjs/common";
import {ScanHistory} from "./scanHistory.entity";

@Injectable()
@EntityRepository(ScanHistory)
export class ScanHistoryRepository extends Repository<ScanHistory> {

    public findAll(skippedItems: number, limit: number) {
        return ScanHistory.find({
            order: {id: "DESC"},
            skip: skippedItems,
            take: limit,
        });
    }

    public async count() {
        return ScanHistory.count();
    }

}
