import {EntityRepository} from "typeorm";
import {IpAddresses} from "./ip-addresses.entity";
import {Injectable} from "@nestjs/common";

@Injectable()
@EntityRepository(IpAddresses)
export class IpAddressesRepository {}