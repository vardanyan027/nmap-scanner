import { EntityRepository } from 'typeorm';
import { Injectable } from "@nestjs/common";
import {ScanHistory} from "./scanHistory.entity";

@Injectable()
@EntityRepository(ScanHistory)
export class ScanHistoryRepository {}
