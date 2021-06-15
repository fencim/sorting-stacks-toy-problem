import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProfileDto } from '../dto/profile.dto';
import { RegisterProfileDto } from '../dto/register-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }
    @ApiBody({ type: RegisterProfileDto })
    @ApiOperation({ summary: "Register new Profile" , operationId: "Register"})
    @ApiResponse({ status: 200, type: ProfileDto })
    @Post()
    async create(@Body() newProfile: RegisterProfileDto):Promise<ProfileDto> {
        return this.profileService.create(newProfile);
    }
    @ApiOperation({ summary: "Get information of profile with id {id}", operationId: "GetProfile" })
    @ApiResponse({ status: 200, type: ProfileDto })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ProfileDto> {
        return this.profileService.findOne(id);
    }
    
    @ApiOperation({ summary: "Delete profile with id {id}", operationId: "DeleteProfile" })
    @ApiResponse({ status: 200, type: ProfileDto })
    @Delete(':id')
    async deleteOne(@Param('id') id: string): Promise<ProfileDto> {
        return this.profileService.deleteOne(id);
    }

    @ApiOperation({ summary: "update profile", operationId: "UpdateProfile" })
    @ApiBody({ type: ProfileDto })
    @Put()
    async update(@Param('id') id: string, @Body() player: ProfileDto) : Promise<ProfileDto> {
        return this.profileService.update(id, player);
    }
}
