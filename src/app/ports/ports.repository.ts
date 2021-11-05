import {EntityRepository, Repository} from 'typeorm';
import {Injectable} from "@nestjs/common";
import {Ports} from "./ports.entity";

@Injectable()
@EntityRepository(Ports)
export class PortsRepository extends Repository<Ports> {
    public find() {
        return Ports.find();
    }
}
