import { HttpException, HttpStatus, Body, Injectable} from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { ScannerRepository } from "./scanner.repository";
import { PaginationDto } from "../dto/pagination.dto";
import { PaginatedScansResultDto } from "./dto/paginatedScansResult.dto";

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

    async findAll(paginationDto: PaginationDto): Promise<PaginatedScansResultDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

        const totalCount = await this.scannerRepository.count()
        const scans = await this.scannerRepository.findAll(skippedItems, paginationDto.limit);
        var pageCount = Math.ceil(totalCount / paginationDto.limit);
        return {
            totalCount,
            itemCountInPage: scans.length,
            page: paginationDto.page,
            pageCount: pageCount,
            limit: paginationDto.limit,
            data: scans,
        }
    }

    public async changeStatus(status: string) {
        let scans = await this.scannerRepository.find();
        scans[0].status = status;
        await scans[0].save();
    }

    public async changePeriod(period: number) {
        let scans = await this.scannerRepository.find();
        scans[0].period = period;
        await scans[0].save();
    }

}