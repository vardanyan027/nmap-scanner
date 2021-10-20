import {EntityRepository, Repository} from 'typeorm';
import {Injectable} from "@nestjs/common";
import {Ports} from "./ports.entity";

@Injectable()
@EntityRepository(Ports)
export class PortsRepository extends Repository<Ports> {
    public async createPort (data) {
        const {port, protocol, service, method} = data
        let entity = new Ports();
        entity.port = port;
        entity.protocol = protocol;
        entity.service = service;
        entity.method = method;
        await entity.save();
    }

    public async find() {
        return Ports.find();
    }

    public async count() {
        return Ports.count();
    }

    public async deletePorts (data) {
        data.forEach(el => {
            Ports.remove(el);
        })
    }
}
