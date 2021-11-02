import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {IpAddresses} from "./ip-addresses.entity";
import {IpAddressesRepository} from "./ip-addresses.repository";

@Module({
    imports: [TypeOrmModule.forFeature([IpAddresses]), IpAddressesRepository],
    providers: [IpAddressesRepository],
    exports: [IpAddressesRepository]
})
export class IpAddressesModule {
}
