import { Scans } from "../scanner.entity";

export class PaginatedScansResultDto {
    data: Scans[]
    page: number
    limit: number
    totalCount: number
    itemCountInPage: number
}