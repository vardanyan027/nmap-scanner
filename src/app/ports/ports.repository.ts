import {EntityRepository, Repository} from 'typeorm';
import {Injectable} from "@nestjs/common";
import {Ports} from "./ports.entity";

@Injectable()
@EntityRepository(Ports)
export class PortsRepository extends Repository<Ports> {
    public async createPort (data) {
        const {port, protocol, service, method} = data.openPorts[0]
        let ports = new Ports();
        ports.port = port;
        ports.protocol = protocol;
        ports.service = service;
        ports.method = method;
        await ports.save();
        return ports;
    }

    public findAll(skippedItems: number, limit: number) {
        return Ports.find({
            skip: skippedItems,
            take: limit,
        });
    }
    public find() {
        return Ports.find();
    }
    public async count() {
        return Ports.count();
    }

}
