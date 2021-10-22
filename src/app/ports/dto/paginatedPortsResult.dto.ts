import { Ports } from "../ports.entity";

export class PaginatedPortsResultDto {
    data: Ports[]
    page: number
    limit: number
    totalCount: number
    itemCountInPage: number
    pageCount: number
}