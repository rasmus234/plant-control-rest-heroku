import {Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {PlantService} from "./plant.service";
import {CreatePlantDto} from "./dto/create-plant.dto";
import {UpdatePlantDto} from "./dto/update-plant.dto";
import {Plant} from "./plant.schema";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller("plants")
export class PlantsController {
    constructor(private readonly plantService: PlantService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() createPlantDto: CreatePlantDto, @UploadedFile() imageFile: Express.Multer.File) {
        createPlantDto.image = imageFile?.buffer;
        return this.plantService.create(createPlantDto);
    }

    @Get()
    findAll() {
        return this.plantService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.plantService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updatePlantDto: UpdatePlantDto) {
        return this.plantService.update(id, <Plant>updatePlantDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.plantService.remove(id);
    }
}
