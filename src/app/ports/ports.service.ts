import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PortsRepository} from "./ports.repository";
import {PaginationDto} from "../dto/pagination.dto";
import {PaginatedPortsResultDto} from "./dto/paginatedPortsResult.dto";

@Injectable()
export class PortsService {

    constructor(
        @InjectRepository(PortsRepository)
        private portsRepository: PortsRepository
    ) {}

    async findAll(paginationDto: PaginationDto): Promise<PaginatedPortsResultDto> {
        const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

        const totalCount = await this.portsRepository.count()
        const ports = await this.portsRepository.findAll(skippedItems, paginationDto.limit);

        return {
            totalCount,
            itemCountInPage: ports.length,
            page: paginationDto.page,
            limit: paginationDto.limit,
            data: ports
        }
    }

    public async create(@Body() data) {
        let deletingData = await this.portsRepository.find();

        if (data) {
            data.forEach(el => {
                this.portsRepository.createPort(el);
            })
        }
        await this.delete(deletingData);

    }

    async delete(data){
        return this.portsRepository.deletePorts(data);
    }
}
