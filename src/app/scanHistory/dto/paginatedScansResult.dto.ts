import { ScanHistory } from "../scanHistory.entity";

export class PaginatedScansResultDto {
    data: ScanHistory[]
    page: number
    limit: number
    totalCount: number
    itemCountInPage: number
    pageCount: number
}