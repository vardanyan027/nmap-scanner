import {EntityRepository, Repository} from "typeorm";
import {IpAddresses} from "./ip-addresses.entity";
import {Injectable} from "@nestjs/common";
import {CreateIpAddressDto} from "./dto/createIpAddress.dto";

@Injectable()
@EntityRepository(IpAddresses)
export class IpAddressesRepository extends Repository<IpAddresses>{

    async createIp(data: CreateIpAddressDto) {
        let ip = new IpAddresses();
        ip.hostname = data.hostname;
        ip.ip = data.ip;
        ip.mac = data.mac;
        ip.osNmap = data.vendor;
        return await ip.save()
    }


}