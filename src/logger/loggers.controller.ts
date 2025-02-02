import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {LoggerService} from "./logger.service";
import {CreateLoggerDto} from "./logger.dto";

@Controller("loggers")
export class LoggersController {

    constructor(private loggerService: LoggerService) {
    }


    @Get()
    async getLogs() {
        return await this.loggerService.findAll();
    }

    @Get(":id")
    async getLogger(@Param("id") id: string) {

        return await this.loggerService.findOne(id);
    }

    @Post()
    async createLog(@Body() logger: CreateLoggerDto) {

        return await this.loggerService.create({
            isPaired: false,
            name: logger.name
        });
    }

    @Delete(":id")
    async deleteLogger(@Param("id") id: string) {

        return await this.loggerService.remove(id);
    }

}
