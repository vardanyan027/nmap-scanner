import {HttpException, HttpStatus} from "@nestjs/common";

const STATUS = 602;
const RESPONSE = 'Open Ports Not Found';

export class PortsNotFoundException extends HttpException {
    constructor() {
        super(RESPONSE, STATUS);
    }
}