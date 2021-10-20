import {Body, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PortsRepository} from "./ports.repository";
import {Ports} from "../ports/ports.entity";
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class PortsService {

    constructor(
        @InjectRepository(PortsRepository)
        private portsRepository: PortsRepository
    ) {}

    public async getAll() {
        return await this.portsRepository.find();
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Ports>> {
        return paginate<Ports>(this.portsRepository, options);
    }

    public async create(@Body() data) {
        let dataforDelete = await this.portsRepository.find();

        if (data) {
            data.forEach(el => {
                this.portsRepository.createPort(el);
            })
        }
        await this.delete(dataforDelete);

    }

    async delete(data){
        return this.portsRepository.deletePorts(data);
    }
}
