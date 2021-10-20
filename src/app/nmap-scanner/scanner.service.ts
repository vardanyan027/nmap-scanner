import { HttpException, HttpStatus, Body, Injectable} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {ScannerRepository} from "./scanner.repository";
import {Scans} from "./scanner.entity";

import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import {Repository} from "typeorm";

@Injectable()
export class ScannerService {

    constructor(
        @InjectRepository(ScannerRepository)
        private scannerRepository: ScannerRepository
    ) {}

    public async parse(@Body() data) {
        try {
            await this.scannerRepository.createScans(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    public async get() {
        return await this.scannerRepository.find();
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Scans>> {
        return paginate<Scans>(this.scannerRepository, options);
    }
}